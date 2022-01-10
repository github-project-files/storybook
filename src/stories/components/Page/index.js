// @flow

import React from 'react';
import { Wrapper, InnerWrapper } from './styled';

type Props = {
  withMargin?: boolean,
  disableScroll?: boolean,
  centered?: boolean,
  children: React$Node,
};

export default (props: Props) => (
  <Wrapper>
    <InnerWrapper
      className="_test-inner-wrapper"
      withMargin={props.withMargin}
      centered={props.centered}
      disableScroll={props.disableScroll}
    >
      {props.children}
    </InnerWrapper>
  </Wrapper>
);
