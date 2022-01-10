// @flow

import TimeRange from 'react-time-range';
import React, { PureComponent } from 'react';
import { Field } from 'formik';
import { Wrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  onChange?: Function,
  name: string,
  [key: string]: any,
};

/**
 * Render a react-time-range TimeRange input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
class TimeRangeField extends PureComponent<$FlowLintFix> {
  /**
   * Render a react-time-range TimeRange input,
   * for use with Formik's <Field> component
   * @return {React$Node}
   */
  render() {
    // NOTE: Extract props that TimeRange doesn't use, to avoid an error about unrecognized props
    const {
      form,
      field,
      children, // eslint-disable-line
      onBlur, // eslint-disable-line
      onChange, // eslint-disable-line
      ...props
    } = this.props;

    return (
      <TimeRange
        className="react-time-range"
        startLabel="From:"
        endLabel="To:"
        sameIsValid={false}
        endTimeError={null}
        minuteIncrement={60}
        startMoment={field.value.startTime}
        endMoment={field.value.endTime}
        onChange={(timeRange: Object) => {
          let { startTime, endTime } = field.value;
          if (timeRange.startTime && timeRange.startTime !== field.value.startTime) {
            startTime = timeRange.startTime;
          }
          if (timeRange.endTime && timeRange.endTime !== field.value.endTime) {
            endTime = timeRange.endTime;
          }
          form.setFieldValue(field.name, {
            startTime,
            endTime,
          });
        }}
        {...props}
      />
    );
  }
}

// NOTE: We intentionally extract className so we don't accidentally pass it into <Field />
export default ({ className, error, ...props }: $FlowLintFix) => (
  <Wrapper error={error}>
    <Field {...props} component={TimeRangeField} />
  </Wrapper>
);
