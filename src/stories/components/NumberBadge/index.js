// @flow

import React from 'react';
import { NumberBadgeWrapper } from './styled';

type Props = {
  count: number,
  plus: boolean,
  theme?: 'red' | 'blue',
  size?: 'sm' | 'lg',
};

export default (props: Props) => (
  <NumberBadgeWrapper theme={props.theme} size={props.size}>
    {props.plus && '+'}
    {props.count}
  </NumberBadgeWrapper>
);
