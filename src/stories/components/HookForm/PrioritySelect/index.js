// @flow
import React, { useState } from 'react';
import Select from 'components/Select';
import Label from '../Label';
import FormGroup from '../FormGroup';
import ErrorMessage from '../ErrorMessage';

import { Wrapper, PrioityOption, PriorityIcon, NonePriorityIcon } from './styled';

type Props = {
  label: string,
  required: boolean,
  error?: string | object,
  onChange: Function,
  value: Array<string> | string,
  className?: string,
};

const PRIORITIES = [
  { value: 'NONE', label: 'None' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const PrioritySelect = (props: Props) => {
  const [priority, setPriority] = useState(props.value || []);

  const handleOnChange = value => {
    let selectValue;
    if (!value) {
      selectValue = null;
    } else {
      selectValue = value.value;
    }
    setPriority(selectValue);
    props.onChange(selectValue);
  };

  const formatOptionLabel = ({ value, label }) => {
    return (
      <PrioityOption>
        {value === 'NONE' && <NonePriorityIcon />}
        {value !== 'NONE' && <PriorityIcon type={value} />}
        {label}
      </PrioityOption>
    );
  };
  return (
    <FormGroup error={!!(props.error && props.error.message)}>
      <Label label={props.label} required={props.required} />
      <Wrapper className={props.className}>
        <Select
          options={PRIORITIES}
          clearable
          placeholder=""
          onChange={handleOnChange}
          value={priority}
          isSearchable={false}
          formatOptionLabel={formatOptionLabel}
          blurInputOnSelect
        />
      </Wrapper>
      {props.error && <ErrorMessage error={props.error.message} />}
    </FormGroup>
  );
};

export default PrioritySelect;
