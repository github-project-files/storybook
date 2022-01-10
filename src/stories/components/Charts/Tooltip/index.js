// @flow
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { TooltipWrapper, Label, Value, Percent } from './styled';

/**
 * renders Tooltip item
 * @param {Object} props
 * @return {Node}
 */
export const renderTooltip = (props: Object) => {
  const { payload } = props;
  return payload.length ? (
    <TooltipWrapper>
      <Label>{payload[0].payload.name}</Label> :<Percent>{payload[0].payload.value}</Percent>%
      <Value>({payload[0].payload.actualValue})</Value>
    </TooltipWrapper>
  ) : (
    ''
  );
};
