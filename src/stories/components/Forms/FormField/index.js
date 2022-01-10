// @flow

import React from 'react';
import RequiredAsterisk from 'components/RequiredAsterisk';
import FormLabel from '../FormLabel';
import FormError from '../FormError';
import Select from '../Select';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import ToggleRow from '../ToggleRow';
import Input from '../Input';
import TimeRangePicker from '../TimeRangePicker';
import DateTimePicker from '../DateTimePicker';
import DateRangePicker from '../DateRangePicker';
import DatePicker from '../DatePicker';
import ButtonGroup from '../ButtonGroup';
import { Wrapper, ClearField } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  fieldType?:
    | 'input'
    | 'toggle'
    | 'select'
    | 'textarea'
    | 'time-range'
    | 'date-range'
    | 'date'
    | 'button-group',
  label?: string,
  inlineLabel?: boolean,
  error?: string,
  icon?: React$Node,
  type?: 'text' | 'email' | 'number',
  width?: number,
  clear?: boolean,
  required?: boolean,
  disabled?: boolean,
  [key: string]: any,
};

/**
 * This is a helper method that will render common combinations of
 * form inputs along with labels and errors. This component combines the usage
 * of <FormLabel>, <FormError>, and an input field component (i.e. <Select>, <Textarea>, <Field>, etc)
 *
 * @example
 *  <FormField
 *    label="Update your Email Address"
 *    name="email"
 *    fieldType="input"
 *    type="email"
 *    placeholder="johndoe@gmail.com"
 *    error={null}
 *  />
 * @example
 *  <FormField
 *    label="Update Language Preference"
 *    name="language"
 *    fieldType="select"
 *    options={[{ value: 'english', label: 'English' }, { value: 'spanish', label: 'Spanish' }]}
 *    error={null}
 *  />
 * @param {Object} props
 * @return {React$Node}
 */
export default ({ label, fieldType, ...props }: $FlowLintFix) => {
  /* eslint-disable no-shadow */
  /**
   * Determine the empty value for clearing a FormField
   * @param {string} fieldType
   * @return {*}
   */
  const clearValue = (fieldType: string) => {
    switch (fieldType) {
      case 'select':
        return [];
      case 'time-range':
        return { startTime: null, endTime: null };
      case 'date-range':
        return { startDate: null, endDate: null };
      case 'date':
      case 'date-time':
        return null;
      case 'toggle':
      case 'toggle-row':
      case 'textarea':
      case 'button-group':
      default:
        return '';
    }
  };
  /* eslint-enable no-shadow */

  return (
    <Wrapper width={props.width} className={props.className} disabled={props.disabled}>
      {label && (
        <FormLabel
          tooltipMessages={props.tooltipMessages}
          inline={props.inlineLabel}
          isClear = {props.clear}
          htmlFor={props.name}
          required={props.required}
        >
          {label}
          { props.required && <RequiredAsterisk /> }
        </FormLabel>
      )}
      {props.clear && (
        <ClearField onClick={() => props.form.setFieldValue(props.name, clearValue(fieldType))}>	
          clear
        </ClearField>
      )}
      {(() => {
        if (fieldType === 'select') {
          return <Select {...props} />;
        }

        if (fieldType === 'toggle') {
          return <Toggle {...props} />;
        }

        if (fieldType === 'toggle-row') {
          return <ToggleRow {...props} />;
        }

        if (fieldType === 'textarea') {
          return <Textarea {...props} />;
        }

        if (fieldType === 'time-range') {
          return <TimeRangePicker {...props} />;
        }

        if (fieldType === 'date-range') {
          return <DateRangePicker {...props} />;
        }

        if (fieldType === 'date') {
          return <DatePicker {...props} />;
        }

        if (fieldType === 'date-time') {
          return <DateTimePicker {...props} />;
        }

        if (fieldType === 'button-group') {
          return <ButtonGroup {...props} />;
        }

        return <Input {...props} />;
      })()}
      {props.error && <FormError>{props.error}</FormError>}
    </Wrapper>
  );
};
