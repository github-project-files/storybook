// @flow
import React from 'react';
import Label from '../Label';
import FormGroup from '../FormGroup';
import ErrorMessage from '../ErrorMessage';
import InputElem from './styled';

type Props = {
  label?: string,
  name: string,
  inputRef: Function,
  type: string,
  required: boolean,
  error?: string | object,
  autoComplete?: string,
  autoFocus?: boolean,
  min?: number,
};

const HookInput = (props: Props) => {
  return (
    <FormGroup error={!!(props.error && props.error.message)}>
      {props.label && <Label label={props.label} required={props.required} />}
      <InputElem
        name={props.name}
        innerRef={props.inputRef}
        type={props.type}
        autoComplete={props.autoComplete || 'off'}
        autoFocus={props.autoFocus}
        min={props.min}
      />
      {props.error && <ErrorMessage error={props.error.message} />}
    </FormGroup>
  );
};

export default HookInput;
