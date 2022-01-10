// @flow

import React, { PureComponent } from 'react';
import * as Actions from 'store/Actions';
import SidePanel from 'components/SidePanel';
import Tooltip from 'components/Tooltip';
import { Avatar, Details } from 'components/ChannelListItem/styled';
import CloseIcon from 'assets/commonIcons/closeIcon.svg';
import InviteUserModal from '../InviteUser';
import RemoveUserModal from '../RemoveUser';
import { Wrapper, AddIcon, TrashWrapper, Trash } from './styled';

type Props = {
  show: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  onEdit?: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onOpen?: Function,
  onClose?: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  t: Function,
  session: Object,
  channel: ?Object,
};

class TeamPanel extends PureComponent<Props> {
  handleInviteUser = () => {
    Actions.modal(InviteUserModal, { channel: this.props.channel });
  };

  handleDelete = (user: Object) => {
    const { session } = this.props;
    Actions.modal(RemoveUserModal, { channel: this.props.channel, user, session });
  };

  /**
   * Render the team panel
   * @return {React$Node}
   */
  render() {
    const { channel } = this.props;
    if (!channel) {
      // In case channel not fetched yet - should be impossible
      return null;
    }

    const users = channel.users || [];
    const title = `${users.length} Members`;

    return (
      <SidePanel
        show={this.props.show}
        width="400"
        headerTitle={title}
        headerButtons={<CloseIcon onClick={this.props.onClose} />}
      >
        {channel.type === 'GROUP_MESSAGE' ? (
          <Wrapper onClick={this.handleInviteUser}>
            <AddIcon /> Invite Person
          </Wrapper>
        ) : null}
        {users.map(user => {
          let name = user.email;
          if (user.firstName && user.lastName) {
            name = `${user.firstName} ${user.lastName}`;
          }

          return (
            <Wrapper key={user.email} disablePointer>
              <Avatar src={user.avatar || '/static/web/assets/defaultAvatar.png'} />
              <Details>{name}</Details>
              {channel.type === 'GROUP_MESSAGE' ? (
                <TrashWrapper onClick={() => this.handleDelete(user)}>
                  <Tooltip
                    id={`tooltip-channelUser-delete-${user.id}`}
                    value="Remove"
                    effect="solid"
                    place="top"
                  >
                    <Trash />
                  </Tooltip>
                </TrashWrapper>
              ) : null}
            </Wrapper>
          );
        })}
      </SidePanel>
    );
  }
}

export default TeamPanel;
