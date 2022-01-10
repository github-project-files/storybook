// @flow

import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import { ChatMarkdown } from 'utils';
import { Wrapper, Avatar, Details, Title, Body, Participants, Star, Unread } from './styled';

type Props = {
  channel: {
    id: number | string,
    type: 'DIRECT_MESSAGE' | 'GROUP_MESSAGE' | 'WORK_ORDER',
    users: Array<Object>,
    pinned: boolean,
    name: string,
    avatar?: ?string,
    lastChannelMessage: Object,
  },
  active: boolean,
  unread: boolean,
  session: Object,
  onClick: Object => void,
};

export default (props: Props) => {
  const messageBody = get(props, 'channel.lastChannelMessage.body', '');
  const messagePerson = get(props, 'channel.lastChannelMessage.user.firstName', '');
  const date = get(props, 'channel.lastChannelMessage.createdAt');

  let message = ChatMarkdown.stripMarkdown(
    (messagePerson ? `${messagePerson}: ` : '') + messageBody,
  );
  if (message.length > 155) {
    message = `${message.substr(0, 40)}...`;
  }

  const otherUser = props.channel.users.find(a => a.id !== props.session.id);
  const otherUserAvatar =
    props.channel.type === 'DIRECT_MESSAGE' && otherUser
      ? otherUser.avatar
      : '/static/web/assets/defaultAvatar.png';

  let channelName = props.channel.name;
  if (props.channel.type === 'DIRECT_MESSAGE' && otherUser) {
    if (otherUser.firstName && otherUser.lastName) {
      channelName = `${otherUser.firstName} ${otherUser.lastName}`;
    } else {
      channelName = otherUser.email;
    }
  }

  return (
    <Wrapper
      pinned={props.channel.pinned}
      onClick={() => props.onClick(props.channel)}
      active={props.active}
    >
      {props.channel.type === 'DIRECT_MESSAGE' ? (
        <Avatar src={otherUserAvatar || '/static/web/assets/defaultAvatar.png'} />
      ) : (
        <Participants active={props.active}>{props.channel.users.length}</Participants>
      )}
      <Details>
        <Title active={props.active}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>{channelName}</label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>{moment(date).fromNow()}</label>
        </Title>
        <Body active={props.active} unread={props.unread}>
          {message}
        </Body>
      </Details>
      {props.channel.pinned ? <Star>⭑</Star> : null}
      {props.unread ? <Unread>·</Unread> : null}
    </Wrapper>
  );
};
