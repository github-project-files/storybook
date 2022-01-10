// @flow

import React from 'react';
import { EmptyTableWrapper, EmptyTableInner } from './styled';

type Props = {
  children: React$Node,
};

export default (props: Props) => (
  <EmptyTableWrapper>
    <EmptyTableInner>{props.children}</EmptyTableInner>
  </EmptyTableWrapper>
);
