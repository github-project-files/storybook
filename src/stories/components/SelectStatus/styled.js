// @flow

import styled from 'styled-components';
import Select from 'components/Select';
import { statusColors, colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  position: relative;
  border: none;
  margin: 0;

  label {
    font-size: 14px;
    color: #aaa;
  }
`;

export const StyledStatusSelect = styled(Select)`
  .react-select__control {
    background: ${p => (p.value === 'OPEN' ? colors.white : statusColors[p.value])};
    border-radius: 36px;
    cursor: pointer;
    transition: 100ms;
    width: 150px;
    border: ${p => (p.value === 'OPEN' ? `1px solid ${colors.slateGrey} !important` : 'none')};

    svg {
      fill: #fff;
    }

    &:hover {
      background: ${p => (p.value !== 'OPEN' ? statusColors[p.value] : colors.paleGrey)};
      opacity: 0.9;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      transition: 100ms;

      svg {
        fill: ${p => (p.value === 'OPEN' ? colors.slateGrey : colors.white)};
      }
    }

    outline: none;
    border: none;

    &:focus,
    &:focus-within {
      outline: none;
      border: none;
      background: ${p => (p.value === 'OPEN' ? colors.white : statusColors[p.value])};
    }
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
      fill: ${p => (p.value === 'OPEN' ? colors.slateGrey : colors.white)};

      &:hover,
      &:active {
        fill: ${p => (p.value === 'OPEN' ? colors.slateGrey : colors.white)};
      }
    }
  }

  .react-select__single-value {
    color: ${p => (p.value === 'OPEN' ? colors.slateGrey : colors.white)};
  }

  span.react-select__indicator-separator {
    background: none;
  }
`;
