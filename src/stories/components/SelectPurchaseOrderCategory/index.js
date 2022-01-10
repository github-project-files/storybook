// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';

import PURCHASE_ORDER_CATEGORIES_QUERY from 'gql/queries/PurchaseOrderCategories.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  additionalSelect?: { label: string, value: string },
  [key: string]: any,
};

/**
 * Massage records to be ReactSelect-friendly
 * @param {Array<Object>} records
 * @return {Array<Object>}
 */
function massageData(records) {
  return records.map(a => ({
    label: a.name,
    value: a.name,
  }));
}

export default (props: $FlowLintFix) => (
  <I18n ns="translations">
    {t => (
      <Query query={PURCHASE_ORDER_CATEGORIES_QUERY}>
        {({ loading, data }) => {
          const purchaseOrderCategories = massageData(data.purchaseOrderCategories || []);
          const menuData = props.additionalSelect
            ? purchaseOrderCategories.concat([props.additionalSelect])
            : purchaseOrderCategories;
          return (
            <FormField
              clearable
              placeholder={t('generic.selectPurchaseOrderCategory')}
              {...props}
              error={props.error}
              fieldType="select"
              options={menuData}
              isLoading={loading}
            />
          );
        }}
      </Query>
    )}
  </I18n>
);
