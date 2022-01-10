// @flow

import React, { PureComponent } from 'react';
import get from 'lodash.get';
import moment from 'moment';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import Tooltip from 'components/Tooltip';

import {
  Wrapper,
  InnerWrapper,
  Avatar,
  Detail,
  Title,
  Name,
  SubTitle,
  Date,
  Body,
  TrashWrapper,
  Trash,
  EditWrapper,
  Edit,
  Input,
  Close,
  Checkmark,
  UserTooltip,
  TooltipAvatarInitials,
  TooltipAvatarImage,
  TooltipInfo,
  TooltipAvatar,
  everyoneSVG,
} from './styled';

type Props = {
  message: Object,
  myMessage?: boolean,
  allowDelete?: boolean,
  editMode?: boolean,
  editable?: boolean,
  onImageClick: string => *,
  onDelete: number => *,
  onUpdate?: (number, string) => *,
  users?: Array<Object>,
};

type State = {
  editMode: boolean,
  showToolTip: boolean,
  text: ?string,
};

class Message extends PureComponent<Props, State> {
  wrapper = null;

  prevHeight = null;

  prevWidth = null;

  toolTipUser = {};

  tooltipX = 0;

  tooltipY = 0;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    editMode: false,
    showToolTip: false,
    text: null,
  };

  /**
   * Set height when transitioning in to editMode
   * Transition out of editmode if message is updated
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps: Props) {
    if (this.wrapper && this.prevHeight && this.prevWidth) {
      this.wrapper.style.height = `${this.prevHeight}px`;
      this.wrapper.style.width = `${this.prevWidth}px`;
      // Set to null - only used for transition to editMode to avoid meaningless updates
      this.prevHeight = null;
      this.prevWidth = null;
    }

    if (this.wrapper && prevProps.message.body !== this.props.message.body) {
      // Allow message to resize for new message
      this.wrapper.style.height = null;
      this.wrapper.style.width = null;
      this.handleEditModeCancel();
    }
  }

  handleEditMode = () => {
    if (!this.wrapper) {
      return;
    }

    this.prevHeight = this.wrapper.scrollHeight;
    this.prevWidth = this.wrapper.scrollWidth;
    this.setState({ editMode: true, text: this.props.message.body });
  };

  handleEditModeCancel = () => {
    this.setState({ editMode: false, text: null });
  };

  handleTextChange = (e: Object) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = () => {
    const { onUpdate, message } = this.props;
    // eslint-disable-next-line no-unused-expressions
    onUpdate && onUpdate(message.id, this.state.text || '');
  };

  getUser = (id: string) => {
    if (id === 'people') {
      return {
        display: 'Everyone',
        email: 'Everyone assigned to this Work Order',
        avatar: everyoneSVG,
        legacyAccountType: '',
      };
    }
    if (!this.props.users) {
      return {};
    }
    // eslint-disable-next-line no-shadow
    const user = JSON.parse(JSON.stringify(this.props.users)).find(user => user.id.includes(id));
    if (!user) {
      return {};
    }
    let display = user.email;
    if (user.firstName) {
      display = user.firstName;
      if (user.lastName) {
        display += ` ${user.lastName}`;
      }
    }
    if (!user.id.startsWith('user')) {
      user.id = `user:${user.id}`;
    }
    user.display = display;
    if (!user.avatar) {
      if (display.indexOf('@') > -1) {
        user.avatar = display.split('@')[0].charAt(0);
      } else {
        const userChar = display.split(' ');
        user.avatar =
          userChar[0].charAt(0) + (userChar[1] ? userChar[1].charAt(0) : userChar[0].charAt(1));
      }
      user.avatar = user.avatar.toUpperCase();
    }
    return user;
  };

  handleShowToolTip = (obj: Object) => {
    if (!obj.target) {
      return;
    }
    this.tooltipX = obj.pageX - obj.currentTarget.parentNode.getBoundingClientRect().left - 170;
    this.tooltipY =
      obj.currentTarget.getBoundingClientRect().top -
      obj.currentTarget.parentNode.getBoundingClientRect().top -
      60;
    //  here 90 is X axis difference bw open window/dialog and tooltip container( better add a props
    //   for it)
    if (this.tooltipX < -90) {
      this.tooltipX -= this.tooltipX + 90;
    }
    const urlParts = obj.target.href.split('/');
    this.toolTipUser = this.getUser(urlParts[urlParts.length - 1]);
    this.setState({
      showToolTip: true,
    });
  };

  handleHideToolTip = (obj: Object) => {
    if (!obj.target) {
      return;
    }
    const urlParts = obj.target.href.split('/');
    this.toolTipUser = this.getUser(urlParts[urlParts.length - 1]);
    this.setState({
      showToolTip: false,
    });
  };

  /**
   * Render a message with editMode
   * @return {React$Node}
   */
  render() {
    const { message, myMessage, onImageClick, onDelete, editable, allowDelete } = this.props;
    const { editMode } = this.state;
    const avatar = get(message, 'user.avatar') || '/static/web/assets/defaultAvatar.png';
    const isActivity = message.type === 'ACTIVITY';
    let markdownBody = DOMPurify.sanitize(this.state.text || message.body);
    if (markdownBody && markdownBody.indexOf('@') > -1) {
      markdownBody = markdownBody.replace(
        /(@)\[(.*?)\]\((.*?):(.*?)\)/gi,
        `$1[$2](/web/people/$4)`,
      );
      if (markdownBody.indexOf('wo-all') > -1) {
        markdownBody = markdownBody.replace(/\/wo-all/g, '');
      }
    }
    const renderers = {
      image: rendererProps => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <img
          alt=""
          src={rendererProps.src}
          onClick={() => onImageClick(rendererProps.src)}
          style={{ cursor: 'pointer' }}
        />
      ),
      link: props => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/mouse-events-have-key-events
          <a
            {...props}
            onMouseLeave={obj => {
              this.handleHideToolTip(obj);
            }}
            onMouseOver={obj => {
              this.handleShowToolTip(obj);
            }}
          />
        );
      },
    };

    let authorName = null;
    if (message.user) {
      authorName = message.user.firstName
        ? `${message.user.firstName} ${message.user.lastName}`
        : message.user.email;
    }

    const createdAt = moment(message.createdAt);
    let dateAuthored = createdAt.format('h:mm a');
    if (
      createdAt.toDate() <
      moment()
        .startOf('day')
        .toDate()
    ) {
      if (
        createdAt.toDate() <
        moment()
          .startOf('year')
          .toDate()
      ) {
        // Less than a year
        dateAuthored = createdAt.format('dddd, MMMM Do YYYY, h:mm:ss a');
      } else {
        // Less than today
        dateAuthored = createdAt.format('dddd, MMMM Do h:mm:ss a');
      }
    }
    const entry = this.toolTipUser;
    return (
      <Wrapper
        // eslint-disable-next-line no-return-assign
        innerRef={r => (this.wrapper = r)}
        myMessage={myMessage}
        isActivity={isActivity}
        type={message.type}
        editMode={editMode}
      >
        <InnerWrapper>
          {message.user && <Avatar src={avatar} />}
          <Detail>
            {message.user ? (
              <Title>
                <Name>{authorName}</Name>
                {message.subTitle && <SubTitle>{message.subTitle}</SubTitle>}
                <Date>{dateAuthored}</Date>
              </Title>
            ) : null}
            <Body isActivity={isActivity}>
              {this.state.showToolTip && entry && Object.keys(entry).length !== 0 ? (
                <UserTooltip tooltipX={this.tooltipX} tooltipY={this.tooltipY}>
                  <TooltipAvatar>
                    {// eslint-disable-next-line no-nested-ternary
                    entry.avatar && typeof entry.avatar === 'string' ? (
                      entry.avatar.length <= 2 ? (
                        <TooltipAvatarInitials>{entry.avatar}</TooltipAvatarInitials>
                      ) : (
                        <TooltipAvatarImage>
                          <img alt="" src={entry.avatar} />
                        </TooltipAvatarImage>
                      )
                    ) : (
                      <entry.avatar />
                    )}
                  </TooltipAvatar>
                  <TooltipInfo>
                    <p>{entry.display}</p>
                    <p>{entry.display !== entry.email ? entry.email : ''}</p>
                    <p>{entry.legacyAccountType}</p>
                  </TooltipInfo>
                </UserTooltip>
              ) : (
                <div />
              )}
              {editMode ? (
                <Input value={markdownBody} onChange={this.handleTextChange} />
              ) : (
                <ReactMarkdown source={markdownBody} escapeHtml={false} renderers={renderers} />
              )}
            </Body>
          </Detail>
        </InnerWrapper>
        {(myMessage && !editMode && message.type !== null) || allowDelete ? (
          <>
            <TrashWrapper onClick={() => onDelete(message.id)}>
              <Tooltip
                id={`tooltip-message-delete-${message.id}`}
                value="Delete"
                effect="solid"
                place="top"
              >
                <Trash />
              </Tooltip>
            </TrashWrapper>
            {editable && (
              <EditWrapper onClick={this.handleEditMode}>
                <Tooltip
                  id={`tooltip-message-edit-${message.id}`}
                  value="Edit"
                  effect="solid"
                  place="top"
                >
                  <Edit />
                </Tooltip>
              </EditWrapper>
            )}
          </>
        ) : null}
        {editMode ? (
          <>
            <Close onClick={this.handleEditModeCancel} />
            <Checkmark onClick={this.handleSubmit} />
          </>
        ) : null}
      </Wrapper>
    );
  }
}

export default Message;
