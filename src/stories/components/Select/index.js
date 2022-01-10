// @flow

import React from 'react';
import ReactSelect from 'react-select';
import ReactSelectCreatable from 'react-select/lib/Creatable';
import { colors } from 'utils/StyleGuide';
import { Wrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  options: Array<*>,
  onChange?: () => void,
  onBlur?: () => void,
  creatable?: boolean,
  disabled?: boolean,
  loading?: boolean,
  clearable?: boolean,
  multi?: boolean,
  onInputChange?: Function,
  onKeyDown?: Function,
  inputValue?: string,
  styles?: Object,
  [key: string]: any,
};

/**
 * Render a react-select input, for use with
 * Formik's <Field> component or as a standalone component.
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: $FlowLintFix) => {
  const Select = props.creatable ? ReactSelectCreatable : ReactSelect;

  let { value } = props;
  if (!props.creatable || (props.options && props.options.length)) {
    value = Array.isArray(props.value)
      ? props.value.map(a => props.options.find(b => b.value === a))
      : props.options.find(a => a.value === props.value);
  } else {
    // Creatable and No Options (i.e. freeform emails)
    value = Array.isArray(props.value)
      ? props.value.map(a => ({ label: a, value: a }))
      : { label: props.value, value: props.value };
  }

  /**
   * Handle key down press when searching for option
   * @param {SyntheticKeyboardEvent<HTMLElement>} event
   */
  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    if (props.onKeyDown) {
      props.onKeyDown(event.target || '');
    }

    if (props.multi && props.creatable) {
      if (!props.inputValue) {
        return;
      }

      switch (event.key) {
        case 'Enter':
        case 'Tab':
          event.preventDefault();
          event.stopPropagation();

          props.onChange([
            // $FlowFixMe
            ...value,
            { label: props.inputValue, value: props.inputValue },
          ]);

          props.onInputChange('');
          break;
        default:
      }
    }
  };

  return (
    <Wrapper>
      <Select
        isClearable={props.clearable || false}
        isDisabled={props.disabled || false}
        isLoading={props.loading || false}
        isMulti={props.multi || false}
        blurInputOnSelect
        styles={{
          control: base => {
            // eslint-disable-next-line no-param-reassign
            delete base[`&:hover`];
            return base;
          },
          multiValueLabel: styles => ({
            ...styles,
            color: '#2c76a1',
            backgroundColor: `${colors.reallyLightBlue}`,
            border: 'solid 1px #57bfef',
            borderRight: '0',
            borderRadius: '4px 0px 0px 4px',
          }),
          multiValueRemove: styles => ({
            ...styles,
            color: '#2c76a1',
            border: 'solid 1px #57bfef',
            borderLeft: '0',
            backgroundColor: `${colors.reallyLightBlue}`,
            borderRadius: '0px 4px 4px 0px',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: `${colors.peach}`,
              color: `${colors.strawberry}`,
              border: `solid 1px ${colors.strawberry}`,
              marginLeft: '-1px',
            },
          }),
          ...props.styles,
        }}
        className={`${props.className ? `${props.className} ` : ''}react-select`}
        classNamePrefix="react-select"
        {...props}
        onBlur={() => {
          if (typeof props.onBlur === 'function') {
            props.onBlur();
          }
        }}
        // eslint-disable-next-line no-shadow
        onChange={value => {
          if (typeof props.onChange === 'function') {
            props.onChange(value);
          }
        }}
        onKeyDown={handleKeyDown}
        value={value || ''}
      />
    </Wrapper>
  );
};
