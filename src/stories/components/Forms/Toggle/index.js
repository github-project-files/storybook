// @flow

import React from 'react';
import { Field } from 'formik';
import { ReactToggleStyled } from './styled';

/**
 * Render a react-toggle input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
export const ToggleField = (props: *) => (
  <ReactToggleStyled
    icons={false}
    {...props}
    defaultChecked={props.field.defaultValue === undefined ? undefined : props.field.defaultValue}
    checked={props.field.value}
    onBlur={() => {
      props.form.setFieldTouched(props.field.name, true);

      if (typeof props.onBlur === 'function') {
        props.onBlur();
      }
    }}
    onChange={() => {
      const value = !props.field.value;

      props.form.setFieldValue(props.field.name, value);

      if (typeof props.onChange === 'function') {
        props.onChange(value);
      }
    }}
  />
);

/**
 * Renders a mobile-styled toggle
 * that animates from left to right when toggled on/off
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: Object) => <Field {...props} component={ToggleField} />;
