// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { FormField } from 'components/Forms';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  [key: string]: any,
};

const STATUSES = [
  { value: 'declined', label: 'Declined' },
  { value: 'approved', label: 'Approved' },
  { value: 'fulfilled', label: 'Fulfilled' },
];

export default (props: $FlowLintFix) => (
  <I18n ns="translations">
    {t => (
      <FormField
        clearable
        placeholder={t('generic.selectPurchaseOrderStatus')}
        {...props}
        error={props.error}
        fieldType="select"
        options={STATUSES}
      />
    )}
  </I18n>
);
