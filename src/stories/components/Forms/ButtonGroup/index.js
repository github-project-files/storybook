// @flow

import React from 'react';
import { Field } from 'formik';
import ButtonGroupRaw from 'components/ButtonGroup';
import { Wrapper } from './styled';

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
const ButtonGroup = (props: *) => {
  return (
    <ButtonGroupRaw
      value={props.field.value}
      onChange={value => {
        if (!Array.isArray(value) && typeof value !== 'string') {
          return;
        }

        props.form.setFieldValue(props.field.name, value);

        if (typeof props.onChange === 'function') {
          props.onChange(value);
        }
      }}
      {...props}
    />
  );
};

// NOTE: We intentionally extract className so we don't accidentally pass it into <Field />
export default ({ className, error, ...props }: *) => (
  <Wrapper error={error} {...props}>
    <Field {...props} component={ButtonGroup} />
  </Wrapper>
);
