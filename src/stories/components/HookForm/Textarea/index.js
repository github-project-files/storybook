// @flow
import React from 'react';
import Label from '../Label';
import FormGroup from '../FormGroup';
import ErrorMessage from '../ErrorMessage';

import Textarea from './styled';

type Props = {
  label: string,
  name: string,
  inputRef: Function,
  type: string,
  required: boolean,
  rows?: string,
  error?: string | object,
};

const HookTextarea = (props: Props) => {
  return (
    <FormGroup error={!!(props.error && props.error.message)}>
      <Label label={props.label} required={props.required} />
      <Textarea
        name={props.name}
        type={props.type}
        innerRef={props.inputRef}
        rows={props.rows || 5}
      />
      {props.error && <ErrorMessage>{props.error.message}</ErrorMessage>}
    </FormGroup>
  );
};

export default HookTextarea;
