// @flow
import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import Select from 'components/Select';
import COMPANY_WORK_ORDER_CATEGORIES_QUERY from 'gql/queries/CompanyWorkOrderCategories.graphql';
import Label from '../Label';
import FormGroup from '../FormGroup';
import ErrorMessage from '../ErrorMessage';

import Wrapper from './styled';

type Props = {
  className?: string,
  label: string,
  required: boolean,
  error?: string | object,
  additionalSelect?: { label: string, value: string },
  onChange: Function,
  value: Array<string> | string,
  multi?: boolean,
};

const WorkOrderCategorySelect = (props: Props) => {
  const [categoryValue, setCategoryValue] = useState([]);
  /**
   * Massage records to be ReactSelect-friendly
   * @param {Array<Object>} records
   * @return {Array<Object>}
   */
  const massageData = records => {
    return records.map(a => ({
      label: a.name,
      value: a.name,
    }));
  };
  const handleOnChange = value => {
    let selectValue;
    if (props.multi) {
      props.onChange(value);
    } else {
      if (!value) {
        selectValue = null;
      } else {
        selectValue = value.value;
      }
      setCategoryValue(selectValue);
      props.onChange(selectValue);
    }
  };

  useEffect(() => {
    setCategoryValue(props.value);
  }, [props.value]);

  return (
    <Query query={COMPANY_WORK_ORDER_CATEGORIES_QUERY}>
      {({ loading, data }) => {
        const categories = massageData(data.companyWorkOrderCategories || []);
        const menuData = props.additionalSelect
          ? categories.concat([props.additionalSelect])
          : categories;
        return (
          <FormGroup error={!!(props.error && props.error.message)}>
            <Label label={props.label} required={props.required} />
            <Wrapper className={props.className}>
              <Select
                placeholder=""
                multi={props.multi}
                options={menuData}
                loading={loading}
                clearable
                onChange={handleOnChange}
                value={categoryValue}
                blurInputOnSelect
              />
            </Wrapper>
            {props.error && <ErrorMessage error={props.error.message} />}
          </FormGroup>
        );
      }}
    </Query>
  );
};

export default WorkOrderCategorySelect;
