// @flow

import React from 'react';
import Tooltip from './Tooltip';
import { Wrapper, Label } from './styled';

type Props = {
  children: React$Node,
  htmlFor: string,
  inline?: boolean,
  required?: boolean,
  tooltipMessages?: string[] | string,
  isClear?: boolean,
};

/**
 * Basic form field label that shows above most input fields
 * @example <FormLabel>Email Address</FormLabel>
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: Props) => (
  <Wrapper isClear={props.isClear}>
    <Label htmlFor={props.htmlFor} inline={props.inline} required={props.required}>
      {props.children}
    </Label>
    {props.tooltipMessages && <Tooltip messages={props.tooltipMessages} />}
  </Wrapper>
);
