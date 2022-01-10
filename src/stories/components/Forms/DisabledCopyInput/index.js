// @flow

import React from 'react';
import { Field } from 'formik';
import copyToClipboardUtil from 'utils/copyToClipboard';
import { Wrapper, CopyButton } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  type?: 'text' | 'email' | 'number',
  error?: string,
  [key: string]: any,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
const Input = ({ error, ...props }: $FlowLintFix) => (
  <span>
    <input
      {...props}
      disabled
      value={props.value !== undefined ? props.value : props.field.value}
    />
    <CopyButton
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        copyToClipboardUtil.copyTextToClipboard(
          props.value !== undefined ? props.value : props.field.value,
        );
      }}
    >
      Copy
    </CopyButton>
  </span>
);

export default (props: $FlowLintFix) => (
  <Wrapper error={props.error}>
    <Field {...props} component={Input} />
  </Wrapper>
);
