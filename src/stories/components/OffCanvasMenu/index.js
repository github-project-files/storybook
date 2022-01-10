// @flow

import React from 'react';

import { Wrapper, Overlay, Content, Header, Body, Footer, CloseBtn, CloseIcon } from './styled';

type Props = {
  visible: boolean,
  toggleView: Function,
  position?: string,
  contentWidth: string,
  title: string | React$Node,
  actions: React$Node,
  children: React$Node,
  footerActions?: React$Node,
};

const OffCanvasMenu = (props: Props) => {
  return (
    <Wrapper className={props.visible ? 'show-overlay' : ''}>
      <Overlay onClick={() => props.toggleView(false)} />
      <Content
        position={props.position}
        className={props.visible ? 'show-content' : ''}
        width={props.contentWidth}
      >
        <Header>
          <div>{props.title}</div>
          <div>
            {props.actions && <span>{props.actions}</span>}
            <CloseBtn onClick={() => props.toggleView(false)}>
              <CloseIcon />
            </CloseBtn>
          </div>
        </Header>
        <Body>{props.children}</Body>
        <Footer>{props.footerActions}</Footer>
      </Content>
    </Wrapper>
  );
};

export default OffCanvasMenu;
