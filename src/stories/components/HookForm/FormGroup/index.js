// @flow
import React from 'react';
import FormGroupElem from './styled';

type Props = {
  children: React$Node,
  error: boolean,
};

const FormGroup = (props: Props) => {
  return <FormGroupElem className={props.error ? 'error' : ''}>{props.children}</FormGroupElem>;
};

export default FormGroup;
