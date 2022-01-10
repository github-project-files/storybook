// @flow

import React from 'react';
import { Field } from 'formik';
import { Wrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  height?: number,
  error?: string,
  [key: string]: any,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
const Textarea = (props: *) => (
  <textarea
    {...props}
    onBlur={() => {
      props.form.setFieldTouched(props.field.name, true);

      if (typeof props.onBlur === 'function') {
        props.onBlur();
      }
    }}
    onChange={e => {
      const { value } = e.target;
      props.form.setFieldValue(props.field.name, value);

      if (typeof props.onChange === 'function') {
        props.onChange(value);
      }
    }}
    onKeyDown={e => {
      if (e.key === 'Enter' && typeof props.form.handleSubmit === 'function') {
        // props.form.handleSubmit(e, ...args);
      }
    }}
    value={props.value !== undefined ? props.value : props.field.value}
  />
);

export default ({ error, ...props }: $FlowLintFix) => (
  <Wrapper error={error}>
    <Field {...props} component={Textarea} />
  </Wrapper>
);
