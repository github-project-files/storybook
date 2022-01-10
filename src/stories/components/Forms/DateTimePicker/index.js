// @flow

import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import React, { PureComponent } from 'react';
import { Field } from 'formik';
import { DateTimePicker } from 'react-widgets';
import { Wrapper } from './styled';

moment.locale('en');
momentLocalizer();

// eslint-disable-next-line no-unused-vars
type Props = {
  onChange?: Function,
  name: string,
  value: moment$Moment,
  [key: string]: any,
};

type State = {
  focused: boolean,
  value: *,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} nextProps
 */
class DateTimePickerField extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/no-unused-state
    focused: false,
    value: null,
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    const { value } = this.props.field;
    if (value) {
      this.setState({ value });
    }
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = (nextProps: $FlowLintFix) => {
    const { value } = this.props.field;
    if (nextProps.value !== value) {
      this.setState({ value });
    }
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
      disabled,
      format,
      step,
    } = this.props;

    return (
      <DateTimePicker
        format={format || 'MMMM Do YYYY, h:mm a'}
        defaultValue={this.state.value}
        value={this.state.value}
        onChange={value => {
          form.setFieldValue(field.name, value);

          if (typeof onChange === 'function') {
            onChange(value);
          }
        }}
        disabled={!!disabled}
        step={step || 30}
      />
    );
  }
}

// NOTE: We intentionally extract className so we don't accidentally pass it into <Field />
export default ({ className, error, ...props }: $FlowLintFix) => (
  <Wrapper error={error}>
    <Field {...props} component={DateTimePickerField} />
  </Wrapper>
);
