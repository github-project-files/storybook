// @flow

import React, { PureComponent } from 'react';
import { Field } from 'formik';
import { SingleDatePicker } from 'react-dates';
import { Wrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  onChange?: Function,
  name: string,
  value: moment$Moment,
  displayFormat?: string,
  [key: string]: any,
};

type State = {
  focused: boolean,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
class DatePickerField extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    focused: false,
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    // let undefined be passed as the prop value rather than null in SingleDatePicker
    displayFormat: localStorage.getItem('dateFormat') || 'MM/DD/YY',
  };

  /**
   * Render react-dates SingleDatePicker input,
   * for use with Formik's <Field> component
   * @return {React$Node}
   */
  render() {
    // NOTE: Extract props that SingleDatePicker doesn't use, to avoid an error about unrecognized props
    const {
      form,
      field,
      onChange,
      children, // eslint-disable-line
      onBlur, // eslint-disable-line
      ...props
    } = this.props;

    return (
      <SingleDatePicker
        noBorder
        hideKeyboardShortcutsPanel
        date={field.value === '' ? null : field.value}
        focused={this.state.focused}
        inputIconPosition="after"
        onFocusChange={({ focused }) => this.setState({ focused })}
        displayFormat={props.displayFormat}
        onDateChange={date => {
          form.setFieldValue(field.name, date);

          if (typeof onChange === 'function') {
            onChange(date);
          }
        }}
        {...props}
      />
    );
  }
}

// NOTE: We intentionally extract className so we don't accidentally pass it into <Field />
export default ({ className, error, ...props }: $FlowLintFix) => (
  <Wrapper error={error} {...props}>
    <Field {...props} component={DatePickerField} />
  </Wrapper>
);
