// @flow

import React from 'react';
import Select from 'components/Select';
import { Wrapper, Label, Subtext } from './styled';

type Props = {
  filterWOCount: number,
  totalWOCount: number,
  value: string,
};

/**
 * Render an export type select
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: Props) => {
  const options = [
    {
      label: `All Work Orders (${props.totalWOCount})`,
      subtext: 'All your work orders – including archived and complete – will be exported.',
      value: 'all',
    },
    // {
    //   label: 'Selected Work Orders',
    //   subtext: 'Only selected work orders will be exported',
    //   value: 'selected',
    // },
    {
      label: `Filtered Work Orders (${props.filterWOCount})`,
      subtext: 'Only filtered work orders will be exported',
      value: 'filtered',
    },
  ];
  return (
    <Wrapper>
      <Label>Choose Work Orders</Label>
      <Select
        placeholder=""
        {...props}
        fieldType="select"
        options={options}
        clearable={false}
      />
      <Subtext>
        {options.filter(item => item.value === props.value)[0].subtext}
      </Subtext>
    </Wrapper>
  );
};
