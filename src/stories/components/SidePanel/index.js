// @flow

import React from 'react';
import SidePanelHeader from 'components/SidePanelHeader';
import { Wrapper, InnerWrapper } from './styled';

type Props = {
  children: React$Node,
  show: boolean,
  side?: 'left' | 'right',
  width?: string,
  header?: React$Node | boolean,
  headerNav?: { title: string, handleOnClick: Function },
  headerTitle?: string,
  headerButtons?: React$Node,
  // eslint-disable-next-line react/no-unused-prop-types
  onClose?: Function,
};

export default (props: Props) => (
  <Wrapper width={props.width} show={props.show} side={props.side}>
    {(() => {
      if (props.header === false) {
        return null;
      }
      if (props.header === undefined) {
        if (!props.headerNav && !props.headerTitle && !props.headerButtons) {
          return null;
        }

        return (
          <SidePanelHeader
            nav={props.headerNav}
            title={props.headerTitle || ''}
            buttons={props.headerButtons}
          />
        );
      }
      return props.header;
    })()}
    <InnerWrapper>{props.children}</InnerWrapper>
  </Wrapper>
);
