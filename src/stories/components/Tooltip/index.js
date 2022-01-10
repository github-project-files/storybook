// @flow

import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Wrapper, TooltipWrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  children: React$Node,
  id: String,
  value: String,
  display?: 'true' | 'false',
  [key: string]: any,
};

export default (props: $FlowLintFix) => (
  <Wrapper data-for={props.id} data-tip={props.value} {...props}>
    {props.children}
    <TooltipWrapper display={props.display}>
      <ReactTooltip
        id={props.id}
        html={props.html || true}
        getContent={dataTip => `${dataTip}`}
        type={props.type || 'dark'}
        place={props.place || 'top'}
        multiline={props.multiline || true}
        delayShow={props.delayShow || 300}
        effect={props.effect || 'solid'}
      />
    </TooltipWrapper>
  </Wrapper>
);
