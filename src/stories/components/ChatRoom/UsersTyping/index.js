// @flow

import React from 'react';
import { Wrapper } from './styled';

type Props = {
  usersTyping: Array<string>,
};

export default (props: Props) => {
  let typingText = '';

  if (!props.usersTyping.length) {
    return <Wrapper />;
  }

  if (props.usersTyping.length === 1) {
    typingText = `${props.usersTyping[0]} is typing`;
  } else if (props.usersTyping.length === 2) {
    typingText = `${props.usersTyping[0]} and ${props.usersTyping[1]} are typing`;
  } else {
    typingText = 'several people are typing';
  }

  return <Wrapper>{typingText}</Wrapper>;
};
