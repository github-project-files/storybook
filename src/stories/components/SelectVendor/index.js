// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';

import VENDORS_QUERY from 'gql/queries/Vendors.graphql';

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
    value: a.id,
  }));
}

export default (props: $FlowLintFix) => (
  <I18n ns="translations">
    {t => (
      <Query query={VENDORS_QUERY}>
        {({ loading, data }) => {
          const vendors = massageData(data.vendors || []);
          const menuData = props.additionalSelect
            ? vendors.concat([props.additionalSelect])
            : vendors;
          return (
            <FormField
              clearable
              placeholder={t('generic.selectVendor')}
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
