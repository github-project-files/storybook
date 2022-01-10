// @flow

import React from 'react';
import get from 'lodash.get';
import Tooltip from 'components/Tooltip';
import type { RouterHistory } from 'react-router';
import { Wrapper, Details, Options, BackIcon } from './styled';
import { Participants, Avatar } from '../../ChannelListItem/styled';
import TeamsIcon from './img/teamIcon.svg';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  channel?: ?Object,
  session: Object,
  history: RouterHistory,
  onOpenTeamPanel: Function,
};

export default (props: Props) => {
  const users = get(props, 'channel.users', []);
  const description = get(props, 'channel.description', null);
  const type = get(props, 'channel.type', null);
  const otherUsers = users.filter(a => a.id !== props.session.id);

  let name = get(props, 'channel.name', null);
  let participantContent = <Participants>{users.length ? users.length : null}</Participants>;
  if (type === 'DIRECT_MESSAGE' && otherUsers.length) {
    if (otherUsers[0].firstName && otherUsers[0].lastName) {
      name = `${otherUsers[0].firstName} ${otherUsers[0].lastName}`;
    } else {
      name = otherUsers[0].email;
    }
    participantContent = <Avatar src={otherUsers[0].avatar || '/static/web/assets/defaultAvatar.png'} />;
  }

  return (
    <Wrapper>
      <BackIcon onClick={() => props.history.push('/web/messages')} />
      {participantContent}
      <Details>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>{name}</label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>{description}</label>
      </Details>
      <Options>
        <Tooltip value="Team">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <span onClick={props.onOpenTeamPanel}>
            <TeamsIcon />
          </span>
        </Tooltip>
      </Options>
    </Wrapper>
  );
};
