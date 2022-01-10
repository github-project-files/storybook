// @flow

import get from 'lodash.get';
import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import withSession from 'hocs/withSession';

import ADD_CHANNEL_MESSAGE_MUTATION from 'gql/mutations/AddChannelMessage.graphql';
import UPDATE_CHANNEL_MESSAGE_MUTATION from 'gql/mutations/UpdateChannelMessage.graphql';
import DELETE_CHANNEL_MESSAGE_MUTATION from 'gql/mutations/DeleteChannelMessage.graphql';
import CHANNEL_QUERY from 'gql/queries/ChannelById.graphql';
import CHANNEL_MESSAGES_QUERY from 'gql/queries/ChannelMessages.graphql';

import type { RouterHistory } from 'react-router';
import ChatRoom from './ChatRoom';

type Props = {
  t: Function,
  channelId?: number | string,
  channel?: ?Object,
  history: RouterHistory,
  session: Object,
};

type State = {
  message: string,
};

class ChatRoomContainer extends PureComponent<Props, State> {
  /**
   * Render a self-sustaining chat room view. This view is used to show
   * messaging activity within various parts of the app.
   * @return {React$Node}
   */
  render() {
    const { session } = this.props;
    return (
      <Mutation mutation={ADD_CHANNEL_MESSAGE_MUTATION}>
        {addChannelMessage => (
          <Mutation mutation={UPDATE_CHANNEL_MESSAGE_MUTATION}>
            {updateChannelMessage => (
              <Mutation mutation={DELETE_CHANNEL_MESSAGE_MUTATION}>
                {deleteChannelMessage => (
                  <Query query={CHANNEL_QUERY} variables={{ channelId: this.props.channelId }}>
                    {channelQuery => (
                      <Query
                        query={CHANNEL_MESSAGES_QUERY}
                        variables={{ channelId: this.props.channelId }}
                        notifyOnNetworkStatusChange
                      >
                        {channelMessagesQuery => {
                          const loading = channelQuery.loading || channelMessagesQuery.loading;
                          const channel =
                            get(channelQuery, 'data.channel', this.props.channel) || {};
                          const channelMessages = get(
                            channelMessagesQuery,
                            'data.channelMessages',
                            [],
                          );

                          return (
                            <ChatRoom
                              t={this.props.t}
                              history={this.props.history}
                              loading={loading}
                              session={session}
                              channelId={this.props.channelId}
                              channel={channel}
                              channelMessages={channelMessages}
                              refetchChannel={channelQuery.refetch}
                              refetchChannelMessages={channelMessagesQuery.refetch}
                              fetchMore={channelMessagesQuery.fetchMore}
                              addChannelMessage={addChannelMessage}
                              updateChannelMessage={updateChannelMessage}
                              deleteChannelMessage={deleteChannelMessage}
                            />
                          );
                        }}
                      </Query>
                    )}
                  </Query>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(ChatRoomContainer);
