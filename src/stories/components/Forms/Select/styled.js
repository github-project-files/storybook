// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import {
  inputStyle,
  INPUT_HEIGHT,
  inputDisabledStyle,
  inputFontStyle,
  inputPlaceholderStyle,
} from '../FormStyles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .react-select__control {
    ${inputStyle}
    height: auto;
    padding: 0;
    line-height: normal;

    &--isFocused {
    }
  }

  .react-select-input {
    height: ${INPUT_HEIGHT}px;

    input {
      height: ${INPUT_HEIGHT}px;
      line-height: ${INPUT_HEIGHT}px;
      padding: 0;
    }
  }

  .react-select-placeholder,
  .react-select--single > .react-select-control .react-select-value {
    line-height: ${INPUT_HEIGHT}px;
  }

  .react-select--isDisabled {
    ${inputDisabledStyle}
  }

  .react-select input {
    border: none;
    box-shadow: none;
    height: auto;
  }

  .react-select__option {
    ${inputFontStyle}
  }

  .react-select__placeholder {
    ${inputFontStyle}
    ${inputPlaceholderStyle}
  }
`;
