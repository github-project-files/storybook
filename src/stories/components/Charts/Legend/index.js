// @flow
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { LegendItem, Marker, Label, Value } from './styled';
/**
 * Renders Legend items
 * @param {Object} props
 * @return {Node}
 */
export const renderLegend = (props: Object) => {
  const { payload } = props;
  return payload.map((entry, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <LegendItem key={`legend-item-${index}`}>
      <Marker bgColor={entry.color} />
      <Label>{entry.value}</Label>
      <Value>{entry.payload.value}%</Value>
    </LegendItem>
  ));
};
