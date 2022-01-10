// @flow

import React from 'react';
import { Wrapper } from './styled';

type Props = {
  width?: number,
  children: React$Node,
};

export default (props: Props) => <Wrapper width={props.width}>{props.children}</Wrapper>;
