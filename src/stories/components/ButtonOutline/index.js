// @flow

import React from 'react';
import { Wrapper } from './styled';

type Props = {
  children: React$Node,
  theme?: 'blue',
  pill?: boolean,
};

export default (props: Props) => <Wrapper {...props}>{props.children}</Wrapper>;
