// @flow

import React from 'react';
import Select from 'react-select';
import {
  getContainerStyle,
  getControlStyle,
  getDropdownIndicatorStyle,
  getOptionStyle,
  getTheme,
} from './helpers';

// eslint-disable-next-line no-unused-vars
type Props = {
  title: string,
  width?: string,
  themeName: 'red-bordered' | 'blue-bordered',
  onChange: () => void,
  [key: string]: any,
};

/**
 * @param {Props} props
 * @return {React$Node}
 */
const ButtonStyledSelect = ({ title, width, theme, onChange, ...props }: $FlowLintFix) => (
  <Select
    value={{ label: title }}
    isSearchable={false}
    onChange={onChange}
    theme={getTheme(theme)}
    styles={{
      container: getContainerStyle(width),
      control: getControlStyle(width),
      option: getOptionStyle(width),
      dropdownIndicator: getDropdownIndicatorStyle,
    }}
    {...props}
  />
);

export default ButtonStyledSelect;
