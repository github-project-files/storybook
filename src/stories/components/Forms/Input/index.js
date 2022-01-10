// @flow

import React from 'react';
import { Field } from 'formik';
import { Wrapper, CustomError } from './styled';

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
export const InputComponent = ({ error, ...props }: $FlowLintFix) => (
  <input
    {...props}
    onBlur={(...args) => {
      props.form.setFieldTouched(props.field.name, true);

      if (typeof props.onBlur === 'function') {
        props.onBlur(...args);
      }
    }}
    onKeyDown={(e, ...args) => {
      if (e.key === 'Enter' && typeof props.form.handleSubmit === 'function') {
        props.form.handleSubmit(e, ...args);
      }
    }}
    onChange={(e, ...args) => {
      props.form.setFieldValue(props.field.name, e.target.value);

      if (typeof props.onChange === 'function') {
        props.onChange(e.target.value, ...args);
      }
    }}
    value={props.value !== undefined ? props.value : props.field.value}
  />
);

/**
 * @param {Object} fieldProps
 * @return {React$Node}
 */
const WrappedInput = (fieldProps: Object) => {
  const { isValidatedBySchema } = fieldProps;
  const { name } = fieldProps.field;
  const error = fieldProps.form.errors[name];

  return (
    <Wrapper error={error}>
      <InputComponent {...fieldProps} />
      {isValidatedBySchema && !!error && <CustomError>{error}</CustomError>}
    </Wrapper>
  );
};

export default (props: Props) => <Field {...props} component={WrappedInput} />;
