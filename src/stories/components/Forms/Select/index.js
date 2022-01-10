// @flow

import React, { PureComponent } from 'react';
import { Field } from 'formik';
import Select from 'components/Select';
import { Wrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  onChange?: () => void,
  onBlur?: () => void,
  creatable?: boolean,
  disabled?: boolean,
  loading?: boolean,
  clearable?: boolean,
  multi?: boolean,
  [key: string]: any,
};

type State = {
  inputValue: string,
  value: Object | Array<Object> | null,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} value
 */
class SelectField extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    inputValue: '',
    value: [],
  };

  handleOnChange = (value: Object | Array<Object> | null) => {
    this.setState({ value });
  };

  /**
   * Render select with change handlers
   * @return {React$Node}
   */
  render() {
    let { options } = this.props;
    // react-select removes the value selected
    // if it isn't present in the options
    // fix - add the selected values in the array of options at runtime
    options =
      Array.isArray(this.state.value) && this.state.value.length > 0
        ? options.concat(this.state.value)
        : options;
    return (
      <Select
        {...this.props}
        value={this.props.value !== undefined ? this.props.value : this.props.field.value}
        inputValue={this.state.inputValue}
        options={options}
        onBlur={() => {
          this.props.form.setFieldTouched(this.props.field.name, true);

          if (typeof this.props.onBlur === 'function') {
            this.props.onBlur();
          }
        }}
        onChange={value => {
          this.handleOnChange(value);
          let val;

          if (value) {
            val = Array.isArray(value) ? value.map(a => a.value) : value.value;
          } else {
            val = '';
          }

          this.props.form.setFieldValue(this.props.field.name, val);

          if (typeof this.props.onChange === 'function') {
            if (Array.isArray(value) || !value) {
              // onChange can return
              //  - Object
              //  - Array<Objects>
              //  - null or undefined
              this.props.onChange(value);
            } else {
              // for backwards compatible API
              this.props.onChange(value.value);
            }
          }
        }}
        onInputChange={(inputValue: string, action: string) => {
          this.setState({ inputValue });
          if (typeof this.props.onInputChange === 'function') {
            this.props.onInputChange(inputValue, action);
          }
        }}
      />
    );
  }
}

// NOTE: We intentionally extract className so we don't accidentally pass it into <Field />
export default ({ className, error, ...props }: *) => (
  <Wrapper error={error}>
    <Field {...props} component={SelectField} />
  </Wrapper>
);
