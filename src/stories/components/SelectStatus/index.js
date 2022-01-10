// @flow

import React from 'react';
import FormLabel from 'components/Forms/FormLabel';
import { Wrapper, StyledStatusSelect } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  label: boolean,
  placeholder?: string,
  onChange?: () => void,
  [key: string]: any,
};

const statusData = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Complete', value: 'COMPLETE' },
];

export default (props: $FlowLintFix) => (
  <Wrapper>
    {props.label && <FormLabel htmlFor="status">Status</FormLabel>}
    <StyledStatusSelect
      className="_test-field-status"
      placeholder={props.placeholder || 'Status'}
      name="status"
      options={statusData}
      {...props}
    />
  </Wrapper>
);
