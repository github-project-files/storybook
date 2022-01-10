// @flow
import React from 'react';
import RequiredAsterisk from 'components/RequiredAsterisk';

import Label from './styled';

type Props = {
  label: string,
  required?: boolean,
};

const FormLabel = (props: Props) => (
  <Label>
    {props.label}
    {props.required && <RequiredAsterisk />}
  </Label>
);

export default FormLabel;
