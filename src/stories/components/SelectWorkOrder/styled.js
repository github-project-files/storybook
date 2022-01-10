// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { inputDisabledStyle, inputFontStyle, inputPlaceholderStyle } from '../Forms/FormStyles';

const STATUS_COLOR = {
  OPEN: colors.white,
  IN_PROGRESS: colors.shamrockGreen,
  ON_HOLD: colors.marigold,
  COMPLETE: colors.steel,
};

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
    background-color: ${colors.alabaster};

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
    background-color: ${colors.alabaster};
    color: ${colors.white};
    :hover {
      background-color: ${colors.alabaster};
      color: ${colors.white};
    }
  }

  .react-select__option--is-focused {
    background-color: ${colors.alabaster};
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
    background-color: ${colors.alabaster};
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

export const OptionDetail = styled.div`
  display: flex;
`;

export const OptionLeft = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
`;

export const WOStatus = styled.span`
  display: flex;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${p => STATUS_COLOR[p.status]};
  border: ${p => (p.status === 'OPEN' ? `1px solid ${colors.slateGrey}` : 'none')};
  display: inline-block;
`;

export const OptionRight = styled.div`
  margin: 11px 15px;
  display: flex;
  flex-direction: column;
`;

export const OptionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: 5px;
  }
`;

export const OptionInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  svg {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
  span {
    font-size: 12px;
    font-weight: normal;
  }
`;

export const WONumber = styled.span`
  padding: 2px 3px;
  margin-right: 8px;
  font-size: 10px;
  font-weight: bold;
  color: ${colors.steel};
  background-color: ${colors.alabaster};
`;

export const WOTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.darkGrey};
`;
