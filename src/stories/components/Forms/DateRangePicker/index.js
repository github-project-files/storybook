// @flow

import React, { PureComponent } from 'react';
import { Field } from 'formik';
import { DateRangePicker } from 'react-dates';
import { Wrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  onChange?: Function,
  name: string,
  value: {
    startDate: moment$Moment,
    endDate: moment$Moment,
  },
  [key: string]: any,
};

type State = {
  focused: 'START_DATE' | 'END_DATE' | null,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
class DateRangeField extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    focused: null,
  };

  /**
   * Render react-dates DateRangePicker input,
   * for use with Formik's <Field> component
   * @return {React$Node}
   */
  render() {
    // NOTE: Extract props that DateRangePicker doesn't use, to avoid an error about unrecognized props
    const {
      form,
      field,
      onChange,
      children, // eslint-disable-line
      onBlur, // eslint-disable-line
      ...props
    } = this.props;

    return (
      <DateRangePicker
        noBorder
        hideKeyboardShortcutsPanel
        startDate={field.value.startDate}
        startDateId={`${field.name}_start_date`}
        endDate={field.value.endDate}
        endDateId={`${field.name}_end_date`}
        focusedInput={this.state.focused}
        onFocusChange={focused => this.setState({ focused })}
        onDatesChange={({ startDate, endDate }) => {
          form.setFieldValue(field.name, {
            startDate,
            endDate,
          });

          if (typeof onChange === 'function') {
            onChange({
              startDate,
              endDate,
            });
          }
        }}
        {...props}
      />
    );
  }
}

// NOTE: We intentionally extract className so we don't accidentally pass it into <Field />
export default ({ className, error, ...props }: $FlowLintFix) => (
  <Wrapper error={error}>
    <Field {...props} component={DateRangeField} />
  </Wrapper>
);
