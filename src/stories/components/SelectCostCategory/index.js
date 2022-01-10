// @flow

import React from 'react';
import { FormField } from 'components/Forms';
import { Query } from 'react-apollo';

import ADDITIONAL_COST_CATEGORY from 'gql/queries/WorkOrderCostCategory.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  [key: string]: any,
};

/**
 * Message records to be ReactSelect-friendly
 * @param {Array<Object>} category
 * @return {Array<Object>}
 */
function selectOptions(category) {
  return category.map(item => ({
    label: item.name,
    value: item.id,
  }));
}

export default (props: $FlowLintFix) => (
  <Query query={ADDITIONAL_COST_CATEGORY}>
    {({ data }) => {
      return data.workOrderCostCategories ? (
        <FormField
          clearable
          placeholder="Select Category"
          {...props}
          error={props.error}
          fieldType="select"
          options={selectOptions(data.workOrderCostCategories || [])}
        />
      ) : (
        ''
      );
    }}
  </Query>
);
