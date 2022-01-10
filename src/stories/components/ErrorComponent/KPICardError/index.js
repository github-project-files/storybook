// @flow
import React from 'react';
import {
  WrapperDiv,
  IconWrapper,
  AlertIcon,
  ContentWrapper,
  ErrorMessage,
  ErrorHelpMessage,
} from './styled';

/**
 * Render a modal with a form for initiating a new group message
 * @return {React$Node}
 */
const PageError = () => {
  return (
    <WrapperDiv>
      <IconWrapper>
        <AlertIcon />
      </IconWrapper>
      <ContentWrapper>
        <ErrorMessage>Something went wrong while loading Dashboard data</ErrorMessage>
        <ErrorHelpMessage>Please try again in sometime</ErrorHelpMessage>
      </ContentWrapper>
    </WrapperDiv>
  );
};

export default PageError;
