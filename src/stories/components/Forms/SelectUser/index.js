// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import FormField from 'components/Select';

import USERS_QUERY from 'gql/queries/Users.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  excludeUserIds?: Array<string | number>,
  excludeUserTypes?: Array<string>,
  [key: string]: any,
};

/**
 * Massage records to be ReactSelect-friendly
 * @param {Array<Object>} records
 * @param {Array<string | number>} excludeUserIds
 * @param {Array<number>} excludeUserTypes
 * @return {Array<Object>}
 */
function massageData(
  records,
  excludeUserIds?: Array<string | number> = [],
  excludeUserTypes?: Array<string> = [],
) {
  return records
    .filter(a => {
      // filter out specified users
      const valid =
        excludeUserIds.indexOf(a.id.toString()) < 0 && excludeUserTypes.indexOf(a.accountType) < 0;
      return valid;
    })
    .map(a => {
      let label = a.email;
      if (a.firstName && a.lastName) {
        label = `${a.firstName} ${a.lastName}`;
      }
      return { label, value: a.id };
    });
}

export default (props: $FlowLintFix) => (
  <I18n ns="translations">
    {t => (
      <Query
        query={USERS_QUERY}
        variables={{
          limit: 250,
        }}
      >
        {({ loading, data }) => (
          <FormField
            clearable
            placeholder={t('generic.selectUser')}
            {...props}
            error={props.error}
            fieldType="select"
            options={massageData(data.users || [], props.excludeUserIds, props.excludeUserTypes)}
            isLoading={loading}
          />
        )}
      </Query>
    )}
  </I18n>
);
