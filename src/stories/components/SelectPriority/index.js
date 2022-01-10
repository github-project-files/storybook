// @flow

import React from 'react';
import { I18n } from 'react-i18next';
import { FormField } from 'components/Forms';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  [key: string]: any,
};

const PRIORITIES = [
  { value: 'NONE', label: 'None' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

export default (props: $FlowLintFix) => (
  <I18n ns="translations">
    {t => (
      <FormField
        clearable
        placeholder={t('generic.selectPriority')}
        {...props}
        error={props.error}
        fieldType="select"
        options={PRIORITIES}
      />
    )}
  </I18n>
);
