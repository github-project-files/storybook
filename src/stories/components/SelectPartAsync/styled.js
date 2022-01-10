// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { inputDisabledStyle, inputFontStyle, inputPlaceholderStyle } from '../Forms/FormStyles';

export const Wrapper = styled.div`
  ${inputFontStyle}

  .react-select__control {
    background-color: ${colors.white};
    border-color: ${colors.silver};

    :focus {
      background-color: ${colors.lightGrey};
      svg {
        fill: ${colors.brightBlue};
      }
    }

    :focus-within {
      background-color: ${colors.lightGrey};
      svg {
        fill: ${colors.brightBlue};
        transform: scaleY(-1);
      }
    }

    :hover {
      svg {
        fill: ${colors.brightBlue};
      }
    }
  }

  .react-select__placeholder {
    ${inputFontStyle}
    ${inputPlaceholderStyle}
  }

  .react-select__dropdown-indicator {
    color: #fff;
    svg {
      fill: ${colors.steel};
    }
  }

  .react-select__indicator-separator {
    background-color: ${colors.silver};
  }

  .react-select__clear-indicator {
    cursor: pointer;
  }

  .react-select__multi-value {
    background-color: ${colors.reallyLightBlue};

    .react-select__multi-value__label {
      color: #2c76a1;
      border: 1px solid #57bfef;
      border-right: 0;
      border-radius: 4px 0 0 4px;
    }
    .react-select__multi-value__remove {
      color: #2c76a1;
      border: 1px solid #57bfef;
      border-left: 0;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      &:hover {
        background-color: ${colors.peach};
        color: ${colors.strawberry};
        border: solid 1px ${colors.strawberry};
        margin-left: -1px;
      }
    }
  }

  .react-select__option--is-selected {
    background-color: ${colors.brightBlue};
    color: ${colors.white};
    :hover {
      background-color: ${colors.brightBlue};
      color: ${colors.white};
    }
  }

  .react-select__option--is-focused {
    background-color: ${colors.reallyLightBlue};
  }

  .react-select--isDisabled {
    ${inputDisabledStyle}
  }

  .react-select__control-is-disabled {
    background-color: #eee;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  padding: 0 0 4px 6px;
  color: ${colors.slateGrey};

  &[required] {
    ::after {
      content: ' *';
      color: ${colors.strawberry};
    }
  }
`;

export const Error = styled.span`
  font-size: 14px;
  padding: 5px 0 0 2px;
  color: ${colors.strawberry};
`;

export const SingleValueWrapper = styled.span`
  ${inputFontStyle}
  display: inline;
  white-space: nowrap;

  p {
    margin: 0;
  }
`;

export const OptionWrapper = styled.div`
  ${inputFontStyle}
  &:hover {
    background-color: ${colors.iceBlue};
    color: ${colors.brightBlue};
  }

  padding: 8px 12px;
  cursor: pointer;

  p {
    margin: 0;
  }

  p:nth-child(2) {
    font-size: small;
  }
`;

export const FormikFieldWrapper = styled.div`
  position: relative;
  width: ${props => (props.width ? props.width : '100%')};
  border: none;
  padding-top: 0;
  padding-bottom: 20px;
  padding-left: 0;
  padding-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  input[readonly] {
    background: ${colors.alabaster};
  }
`;
