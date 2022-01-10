// @flow

import React from 'react';

import { Wrapper, InnerWrapper, LoaderWrapper, LoaderText } from './styled';
import LoaderIcon from './img/loader.svg';

type Props = {
  autoHeight?: boolean,
  inline?: boolean,
  style?: Object,
};

export default (props: Props) => (
  <Wrapper autoHeight={props.autoHeight} inline={props.inline} style={props.style}>
    <InnerWrapper>
      <LoaderWrapper inline={props.inline}>
        <div>
          <LoaderIcon />
        </div>
        <div>
          <LoaderIcon />
        </div>
        <div>
          <LoaderIcon />
        </div>
      </LoaderWrapper>
      <LoaderText>LOADING...</LoaderText>
    </InnerWrapper>
  </Wrapper>
);
