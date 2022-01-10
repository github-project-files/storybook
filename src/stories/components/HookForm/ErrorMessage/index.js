// @flow
import React from 'react';
import ErrorMessageElem from './styled';

type Props = {
  error: string,
};

const ErrorMessage = (props: Props) => <ErrorMessageElem>{props.error}</ErrorMessageElem>;

export default ErrorMessage;
