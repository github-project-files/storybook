// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';

import WORK_ORDER_TIMER_CATEGORIES_QUERY from 'gql/queries/WorkOrderTimerCategories.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
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
      <Query query={WORK_ORDER_TIMER_CATEGORIES_QUERY}>
        {({ loading, data }) => (
          <FormField
            clearable
            placeholder={t('generic.selectWOTimerCategory')}
            {...props}
            error={props.error}
            fieldType="select"
            options={massageData(data.workOrderTimerCategories || [])}
            isLoading={loading}
          />
        )}
      </Query>
    )}
  </I18n>
);
