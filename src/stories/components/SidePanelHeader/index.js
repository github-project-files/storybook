// @flow

import React from 'react';
import CloseIcon from 'assets/commonIcons/closeIcon.svg';
import { Wrapper, ArrowIcon, NavWrapper, TitleWrapper, ButtonsWrapper, BackButton } from './styled';

type Props = {
  backNav?: { title: string, handleOnClick: Function },
  title: string,
  buttons?: React$Node,
  onClose?: Function,
};

export default (props: Props) => (
  <Wrapper>
    <NavWrapper>
      {(() => {
        if (!props.backNav) {
          return null;
        }

        return (
          <BackButton onClick={props.backNav.handleOnClick}>
            <ArrowIcon />
            <span>{props.backNav.title}</span>
          </BackButton>
        );
      })()}
    </NavWrapper>
    <TitleWrapper>{props.title}</TitleWrapper>
    <ButtonsWrapper>
      {props.buttons}
      {(() => {
        if (!props.onClose) {
          return null;
        }

        return <CloseIcon onClick={props.onClose} />;
      })()}
    </ButtonsWrapper>
  </Wrapper>
);
