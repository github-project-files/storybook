// @flow

import styled from 'styled-components';
import Select from 'components/Select';
import { statusColors, colors } from 'utils/StyleGuide';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  position: relative;
  border: none;
  margin: 0;

  label {
    font-size: 14px;
    color: #aaa;
  }
`;

export const StyledPdfOptionSelect = styled(Select)`
  .react-select__control {
    background: ${p => (p.value && statusColors[p.value] ? statusColors[p.value] : '')};
    border-radius: 36px;
    cursor: pointer;
    transition: 100ms;
    width: 170px;
    border: 1px solid ${colors.brightBlue};
    background-color: transparent;
    box-shadow: none;

    svg {
      fill: #fff;
    }

    &:hover {
      background: ${p =>
        p.value && statusColors[p.value] ? lighten(0.1, statusColors[p.value]) : ''};
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      transition: 100ms;

      svg {
        fill: #fff;
      }
    }

    outline: none;

    &:focus,
    &:focus-within {
      outline: none;
      border: none;
      background: ${p => (p.value && statusColors[p.value] ? statusColors[p.value] : '')};
    }
  }

  .react-select__placeholder,
  .react-select__single-value,
  .react-select__value-container {
    color: ${colors.brightBlue};
    font-size: 14px;
    font-weight: 600;

    div,
    input {
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
  }

  .react-select__dropdown-indicator {
    padding: 0;
  }

  .react-select__control-is-focused {
    outline: none;
    border: none;
  }

  .react-select__indicator-separator {
    background-color: none;
  }

  .react-select__dropdown-indicator {
    svg {
      fill: #fff;

      &:hover,
      &:active {
        fill: #fff;
      }
    }
  }

  .react-select__single-value {
    color: #fff;
  }

  span.react-select__indicator-separator {
    background: none;
  }
`;
