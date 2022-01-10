// @flow
import React, { PureComponent } from 'react';
import {
  WrapperDiv,
  IconWrapper,
  AlertIcon,
  ContentWrapper,
  ErrorMessage,
  ErrorHelpMessage,
} from './styled';

type Props = {
  name: string,
};

class SidebarError extends PureComponent<Props> {
  /**
   * Render a modal with a form for initiating a new group message
   * @return {React$Node}
   */
  render() {
    return (
      <WrapperDiv>
        <IconWrapper>
          <AlertIcon />
        </IconWrapper>
        <ContentWrapper>
          <ErrorMessage>
            Something went wrong while loading
            {` ${this.props.name}`}
          </ErrorMessage>
          <ErrorHelpMessage>Please try again in sometime</ErrorHelpMessage>
        </ContentWrapper>
      </WrapperDiv>
    );
  }
}

export default SidebarError;
