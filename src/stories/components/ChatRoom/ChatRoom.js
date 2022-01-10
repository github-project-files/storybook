// @flow

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import get from 'lodash.get';
import apolloClient from 'gql/apolloClient';
import Lightbox from 'react-images';
import Loader from 'components/Loader';
import { socketClient, Log, fileUpload } from 'utils';
import {
  updateChannelByIdQuery,
  updateDirectMessageChannelQuery,
  updateGroupMessageChannelQuery,
  updateChannelMessagesQuery,
  removeChannelMessageQuery,
} from 'gql/GraphQLChannelCache';
import * as Actions from 'store/Actions';
import type { RouterHistory } from 'react-router';
import { Wrapper, LoaderWrapper, MessagesListWrapper, MessagesList } from './styled';
import ChatRoomHeader from './Header';
import ChatRoomMessage from './Message';
import ChatRoomUsersTyping from './UsersTyping';
import ChatRoomInput from './Input';
import TeamPanel from './TeamPanel';

type Props = {
  t: Function,
  history: RouterHistory,
  loading: boolean,
  session: Object,
  channelId?: number | string,
  channel?: Object,
  channelMessages: Array<Object>,
  refetchChannel: (*) => *,
  refetchChannelMessages: (*) => *,
  fetchMore: (*) => *,
  addChannelMessage: (*) => Promise<any>,
  updateChannelMessage: (*) => Promise<any>,
  deleteChannelMessage: (*) => Promise<any>,
};

type State = {
  message: string,
  images: Array<Object>,
  usersTyping: Array<string>,
  imagesUploading: boolean,
  lightboxImage: ?string,
  showTeamPanel: boolean,
  loadedAllMessages: boolean,
};

class ChatRoom extends PureComponent<Props, State> {
  typing = false;

  lastTypingTime = 0;

  messagesListWrapper = MessagesListWrapper;

  topMessage = null;

  messagesListBottom: HTMLDivElement | null;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    message: '',
    images: [],
    usersTyping: [],
    imagesUploading: false,
    lightboxImage: null,
    showTeamPanel: false,
    loadedAllMessages: false,
  };

  /**
   * Initiate socket listeners and subscribe the
   * user to channel's socket room
   */
  componentDidMount() {
    /**
     * Fired when server confirms the user has joined the socket channel
     */
    socketClient.on('joined channel', this.handlePostJoinChatRoom);

    /**
     * Fired when a message is posted by a user
     */
    socketClient.on('channel message posted', this.handleReceiveNewMessage);

    /**
     * Fired when a typing event is received
     */
    socketClient.on('typing in channel', this.handleGetTypingStatus);

    /**
     * Reinitialize the socket subscriptions in the event of a reconnect
     */
    socketClient.on('connect', this.init);

    /**
     * Initiate the socket connection to the channel
     */
    this.init();

    this.handleScrollToBottom();
  }

  /**
   * Kill socket listeners on unmount
   */
  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    // Tell the socket connection we're unsubscribing from this channel
    socketClient.emit('leave channel', this.props.channelId);

    // Kill the socket listeners
    socketClient.off('joined channel', this.handlePostJoinChatRoom);

    socketClient.off('channel message posted', this.handleReceiveNewMessage);

    socketClient.off('typing in channel', this.handleGetTypingStatus);

    socketClient.off('connect', this.init);
  }

  /**
   * Handle deferred initiation when the channel data isn't initially available
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps: Props) {
    const prevMessages = prevProps.channelMessages || [];
    const newMessages = this.props.channelMessages || [];

    const newPage =
      (!prevMessages.length && newMessages.length) || this.props.channelId !== prevProps.channelId;
    if (newPage) {
      // Page initialized
      this.handleScrollToBottom();
    } else if (prevMessages.length !== newMessages.length) {
      if (this.isScrolledToBottom()) {
        // New Message, keep user pinned to bottom
        this.handleScrollToBottom();
      } else if (this.topMessage) {
        // User is scrolling up
        // eslint-disable-next-line react/no-find-dom-node
        const topMessageDOM = ReactDOM.findDOMNode(this.topMessage);
        // Make flow happy
        if (topMessageDOM && typeof topMessageDOM.scrollIntoView === 'function') {
          topMessageDOM.scrollIntoView();
        }
      }
    }

    if (!prevProps.channelId && this.props.channelId) {
      this.init();
    }
  }

  init = () => {
    if (!this.props.channelId) {
      return;
    }

    // Close Team Panel if open when navigating between channels
    this.setState({ showTeamPanel: false });

    // Tell the server we want to join the specified channel
    socketClient.emit('join channel', this.props.channelId);
  };

  handlePostJoinChatRoom = async () => {
    try {
      // Refetch the conversation incase the user is coming back from a suspended app state
      await Promise.all([this.props.refetchChannel(), this.props.refetchChannelMessages()]);
    } catch (e) {
      Log.warn(e);
    }
  };

  handleGetTypingStatus = (isTyping: boolean, user: Object) => {
    // Don't show existing user's typing status. that's just silly
    if (!user || user.id === this.props.session.id) {
      return;
    }

    const { usersTyping } = this.state;

    // If the other user stopped typing
    if (isTyping) {
      this.setState({
        usersTyping: usersTyping.filter(a => a === user.firstName).concat(user.firstName),
      });

      // If the other user started typing
    } else {
      this.setState({
        usersTyping: usersTyping.filter(a => a !== user.firstName),
      });
    }
  };

  handleInputChange = (message: string) => {
    // Update the input
    this.setState({
      message,
    });

    const TYPING_TIMER_LENGTH = 2000; // used to debounce the "user is typing" socket event

    // If user just began typing, let the chat room know that the current user is typing
    if (!this.typing) {
      this.typing = true;
      socketClient.emit('typing in channel', true, this.props.channelId);
    }

    // Save the last time (in ms) of last time user typed
    this.lastTypingTime = new Date().getTime();

    // If enough time passed and user isn't actively typing, emit an event stating user stopped typing
    setTimeout(() => {
      const typingTimer = new Date().getTime();
      const timeDiff = typingTimer - this.lastTypingTime;

      if (timeDiff >= TYPING_TIMER_LENGTH && this.typing) {
        // Emit a socket event stating that the user has stopped typing
        socketClient.emit('typing in channel', false, this.props.channelId);
        this.typing = false;
      }
    }, TYPING_TIMER_LENGTH);
  };

  handleImagesMutate = (images: Array<Object>) => {
    this.setState({
      images,
    });
  };

  handleImageClick = (src: string) => {
    this.setState({
      lightboxImage: src,
    });
  };

  handleLightboxClose = () => {
    this.setState({
      lightboxImage: null,
    });
  };

  handleTeamPanelClose = () => {
    this.setState({ showTeamPanel: false });
  };

  handleTeamPanelOpen = () => {
    this.setState({ showTeamPanel: true });
  };

  handleSendMessage = async () => {
    const { message, images } = this.state;
    const { channelId, session, addChannelMessage } = this.props;
    let body = message;

    if (!(message && message.trim()) && !images.length) {
      return;
    }

    // Append any uploaded messages to the body
    if (images.length) {
      this.setState({ imagesUploading: true });
      const uploadImagePromises = images.reduce((uploadedImages, image) => {
        if (image.deleted) {
          return uploadedImages;
        }
        return uploadedImages.concat([fileUpload.uploadFile('message', image.file)]);
      }, []);
      const uploadedImages = await Promise.all(uploadImagePromises);
      body += '\n';
      body = uploadedImages.reduce((md, image) => {
        return `${md} ![](${image})`;
      }, body);
      this.setState({ imagesUploading: false });
    }

    // Clear the state and disable the typing event
    this.setState({ message: '', images: [] });
    this.typing = false;
    socketClient.emit('typing in channel', false, channelId);

    // NOTE: This prevents user from jumping up during an update if they were previously using
    //  infinity scroll
    this.topMessage = null;

    try {
      const clientGeneratedId = uuidv4();

      const optimisticMessage = {
        __typename: 'Mutation',
        addChannelMessage: {
          __typename: 'ChannelMessage',
          id: Date.now(),
          clientGeneratedId,
          channelId,
          userId: session.id,
          type: 'MESSAGE',
          body,
          updatedAt: moment().format(),
          createdAt: moment().format(),
          user: {
            __typename: 'User',
            id: session.id,
            avatar: session.avatar || null,
            firstName: session.firstName,
            lastName: session.lastName,
          },
        },
      };

      socketClient.emit(`channel message posted`, optimisticMessage.addChannelMessage, channelId);

      window.analytics.track('NewMessage', {
        category: 'Messages',
        channelId,
      });

      await addChannelMessage({
        variables: {
          channelId,
          clientGeneratedId,
          body,
        },
        optimisticResponse: optimisticMessage,
        // eslint-disable-next-line no-shadow
        update: (proxy, { data: { addChannelMessage } }) => {
          updateChannelByIdQuery(addChannelMessage, apolloClient);
          updateDirectMessageChannelQuery(addChannelMessage, apolloClient);
          updateGroupMessageChannelQuery(addChannelMessage, apolloClient);
          updateChannelMessagesQuery(addChannelMessage, apolloClient);
        },
      });
    } catch (e) {
      Log.error(e);
      Actions.alertNotification(this.props.t('generic.somethingWentWrong'), 'error');

      // Re-add the message so that the user doesn't lose it
      this.setState({ message, imagesUploading: false });
    }
  };

  handleMessageUpdate = async (messageId: number, text: string) => {
    try {
      await this.props.updateChannelMessage({
        variables: {
          channelMessageId: messageId,
          body: text,
        },
      });
    } catch (e) {
      Log.error(e);
      Actions.alertNotification(this.props.t('generic.somethingWentWrong'), 'error');
    }
  };

  handleMessageDelete = async (messageId: number) => {
    try {
      await this.props.deleteChannelMessage({
        variables: {
          channelMessageId: messageId,
        },
        update: () => {
          if (!this.props.channel) {
            return;
          }

          removeChannelMessageQuery(this.props.channel, messageId, apolloClient);
        },
      });
    } catch (e) {
      Log.error(e);
      Actions.alertNotification(this.props.t('generic.somethingWentWrong'), 'error');
    }
  };

  handleReceiveNewMessage = async (message: Object) => {
    const { channel, session } = this.props;
    const userId = get(message, 'user.id', message.userId);

    // Don't process the user's own messages
    if (!session || userId === session.id) {
      return;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (!message.__typename) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      message.__typename = 'ChannelMessage';
    }

    // Massage the message
    if (message.type === 'MESSAGE' && !message.user) {
      // If the channel data isn't available yet, there's not much more we can do
      if (!channel) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      message.user = channel.users.find(a => a.id === userId);

      // This should never happen
      if (!message.user) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      message.userId = message.user.id;
    }

    updateChannelByIdQuery(message, apolloClient);
    updateChannelMessagesQuery(message, apolloClient);
    updateDirectMessageChannelQuery(message, apolloClient);
    updateGroupMessageChannelQuery(message, apolloClient);
  };

  handleScroll = () => {
    // Infinite Loading Handler
    if (
      this.messagesListWrapper.scrollTop > 100 ||
      this.props.loading ||
      this.state.loadedAllMessages
    ) {
      return;
    }

    // NOTE: Review nested div structure of messagesListWrapper
    const numMessages = this.messagesListWrapper.childNodes[0].childNodes.length;
    if (numMessages > 1) {
      this.topMessage = this.messagesListWrapper.childNodes[0].childNodes[numMessages - 1];
    } else {
      this.topMessage = null;
    }

    // If element is scrolled to top, fetch next 20 elements
    const limit = 20;
    this.props.fetchMore({
      variables: {
        channelId: this.props.channelId,
        offset: this.props.channelMessages.length,
        limit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          this.setState({ loadedAllMessages: true });
          return prev;
        }

        if (fetchMoreResult.channelMessages.length < limit) {
          this.setState({ loadedAllMessages: true });
        }

        return {
          ...prev,
          channelMessages: [...prev.channelMessages, ...fetchMoreResult.channelMessages],
        };
      },
    });
  };

  handleScrollToBottom = () => {
    if (!this.messagesListBottom) {
      return;
    }

    // eslint-disable-next-line react/no-find-dom-node
    const msgWrapper: any = ReactDOM.findDOMNode(this.messagesListWrapper);
    if (!msgWrapper) {
      return;
    }

    setTimeout(() => {
      msgWrapper.scrollTop = msgWrapper.scrollHeight - msgWrapper.clientHeight;
    }, 100);
  };

  isScrolledToBottom = () => {
    // Use a 400px margin to assume user is chatting at bottom
    const msgWrapper = this.messagesListWrapper;
    if (!msgWrapper) {
      return true;
    }

    return msgWrapper.scrollHeight - msgWrapper.clientHeight <= msgWrapper.scrollTop + 401;
  };

  /**
   * Render a self-sustaining channel view. This view is used to show
   * messaging activity within various parts of the app.
   * @return {React$Node}
   */
  render() {
    const { channel, session } = this.props;

    return (
      <Wrapper>
        <ChatRoomHeader
          channel={channel}
          history={this.props.history}
          session={session}
          onOpenTeamPanel={this.handleTeamPanelOpen}
        />
        {this.props.loading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : null}
        <MessagesListWrapper
          // eslint-disable-next-line no-return-assign
          innerRef={r => (this.messagesListWrapper = r)}
          onScroll={this.handleScroll}
        >
          <MessagesList>
            <div
              style={{ float: 'left', clear: 'both' }}
              // eslint-disable-next-line no-return-assign
              ref={r => (this.messagesListBottom = r)}
            />
            {(this.props.channelMessages || []).map(msg => (
              <ChatRoomMessage
                editable
                key={msg.id}
                message={msg}
                myMessage={msg.user && msg.user.id === session.id}
                onImageClick={this.handleImageClick}
                onUpdate={this.handleMessageUpdate}
                onDelete={this.handleMessageDelete}
              />
            ))}
          </MessagesList>
        </MessagesListWrapper>
        <TeamPanel
          show={this.state.showTeamPanel}
          t={this.props.t}
          onClose={this.handleTeamPanelClose}
          session={session}
          channel={channel}
        />
        <ChatRoomUsersTyping usersTyping={this.state.usersTyping} />
        {this.props.loading ? null : (
          <ChatRoomInput
            t={this.props.t}
            message={this.state.message}
            images={this.state.images}
            imagesUploading={this.state.imagesUploading}
            onImagesMutate={this.handleImagesMutate}
            onChange={this.handleInputChange}
            onSubmit={this.handleSendMessage}
          />
        )}
        {this.state.lightboxImage ? (
          <Lightbox
            images={[{ src: this.state.lightboxImage }]}
            showImageCount={false}
            isOpen={!!this.state.lightboxImage}
            onClose={this.handleLightboxClose}
          />
        ) : null}
      </Wrapper>
    );
  }
}

export default ChatRoom;
