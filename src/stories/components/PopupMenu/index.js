// @flow

import React from 'react';
import { Wrapper } from './styled';

type Props = {
  children: React$Node,
  theme?: 'gray' | 'blue' | 'red' | 'green' | 'yellow',
  thin?: boolean,
};

export default (props: Props) => (
  <Wrapper theme={props.theme} thin={props.thin}>
    {props.children}
  </Wrapper>
);
