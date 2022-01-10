// @flow

import React from 'react';

import { Wrapper, InnerWrapper, LoaderWrapper, LoaderIcon } from './styled';

type Props = {
  size?: 'xs' | 'sm' | 'lg',
  inline?: boolean,
  className?: string,
};

export default (props: Props) => (
  <Wrapper inline={props.inline} className={props.className}>
    <InnerWrapper>
      <LoaderWrapper>
        <LoaderIcon size={props.size} />
        <LoaderIcon size={props.size} />
        <LoaderIcon size={props.size} />
      </LoaderWrapper>
    </InnerWrapper>
  </Wrapper>
);
