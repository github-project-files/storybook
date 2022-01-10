// @flow

import React from 'react';
import RequiredAsterisk from 'components/RequiredAsterisk';
import Toggle from '../Toggle';
import { Wrapper, Label, Description } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  label: string,
  description?: string,
  [key: string]: any,
};

/**
 * Helper compoennt that renders a Toggle input within a two column
 * layout, along with a title label and description.
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: $FlowLintFix) => {
  return (
    <Wrapper>
      <div>
        <Toggle {...props} />
      </div>
      <div>
        <Label htmlFor={props.name || undefined}>
          {props.label}
          {props.required && <RequiredAsterisk />}
        </Label>
        {props.description ? <Description>{props.description}</Description> : null}
      </div>
    </Wrapper>
  );
};
