// @flow

import React from 'react';
import Tooltip from 'components/Tooltip';
import {
  Wrapper,
  HeaderWrapper,
  CloseWrapper,
  CloseIcon,
  HeaderAlterate,
  CloseBtnWrapper,
} from './styled';

type Props = {
  onClose: () => void,
  // eslint-disable-next-line react/no-unused-prop-types
  maxWidth?: number,
  // eslint-disable-next-line react/no-unused-prop-types
  padding?: number,
  header: string | React$ComponentType<any>,
  // eslint-disable-next-line react/no-unused-prop-types
  padding?: number,
  fontSize?: number,
  fontWeight?: string,
  color?: string,
  icon?: string,
  alternate?: boolean,
  children?: any,
  altClassName?: string,
  className?: string,
  closeIconFill?: string,
};

export default (props: Props) => {
  if (props.header !== undefined) {
    return (
      <Wrapper className={props.className}>
        {props.alternate ? (
          <HeaderAlterate className={props.altClassName}>
            <div>{typeof props.header === 'string' ? props.header : <props.header />}</div>
            {props.children}
            <CloseBtnWrapper onClick={() => props.onClose()}>
              <Tooltip id="modal-close" value="Close">
                <CloseIcon />
              </Tooltip>
            </CloseBtnWrapper>
          </HeaderAlterate>
        ) : (
          <HeaderWrapper
            icon={props.icon}
            fontSize={props.fontSize}
            fontWeight={props.fontWeight}
            color={props.color}
          >
            <div>{typeof props.header === 'string' ? props.header : <props.header />}</div>
            <CloseWrapper
              icon={props.icon}
              color={props.closeIconFill}
              onClick={() => props.onClose()}
            >
              <Tooltip id="modal-close" value="Close">
                <CloseIcon />
              </Tooltip>
            </CloseWrapper>
          </HeaderWrapper>
        )}
      </Wrapper>
    );
  }

  return <props.header onClose={() => props.onClose()} />;
};