// @flow
import React from 'react';

import Form from './styled';

type Props = {
  children: React$Node,
  onFormSubmit: Function,
  className?: string,
};

const HookForm = (props: Props) => {
  return (
    <Form className={props.className} onSubmit={props.onFormSubmit} autoComplete="off">
      {props.children}
    </Form>
  );
};

export default HookForm;