// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';

import COMPANY_WORK_ORDER_CATEGORIES_QUERY from 'gql/queries/CompanyWorkOrderCategories.graphql';
import { pure, withErrorBoundary } from 'utils/hocs';
import SidebarError from 'components/ErrorComponent/SidebarCard';

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

/**
 * dropdown for wo categories
 * @param {Object} props
 * @return {*}
 * @constructor
 */
const SelectCategory = (props: $FlowLintFix) => (
  <I18n ns="translations">
    {t => (
      <Query query={COMPANY_WORK_ORDER_CATEGORIES_QUERY}>
        {({ loading, data }) => {
          const categories = massageData(data.companyWorkOrderCategories || []);
          const menuData = props.additionalSelect
            ? categories.concat([props.additionalSelect])
            : categories;
          return (
            <FormField
              clearable
              placeholder={t('generic.selectCategory')}
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

export default withErrorBoundary(pure(SelectCategory), () => (
  <SidebarError name="Workorder categories" />
));
