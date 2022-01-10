// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import scrumIcon from 'assets/commonIcons/scrumIcon.svg';
import calendarIcon from './img/calendarIcon.svg';
import listIcon from './img/listIcon.svg';

/**
 * Determine the button group's size based on the "size" prop
 * @param {string} size
 * @return {string}
 */
function getSize(size) {
  switch (size) {
    case 'xs':
      return { width: 36, height: 30, font: 10, vpad: 0, hpad: 4 };
    case 'sm':
      return { width: 36, height: 36, font: 11, vpad: 0, hpad: 8 };
    case 'lg':
      return { width: 60, height: 48, font: 20, vpad: 0, hpad: 16 };
    default:
      return { width: 80, height: 36, font: 12, vpad: 0, hpad: 12 };
  }
}

export const Wrapper = styled.div`
  margin: 0;
  border-radius: 6px;
  display: ${p => (p.flex ? 'flex' : 'inline-flex')};
  height: ${p => getSize(p.size).height}px;

  [type='radio'] {
    display: none;
  }

  .radio-option {
    min-width: ${p => getSize(p.size).width}px;
    padding: ${p => getSize(p.size).vpad}px ${p => getSize(p.size).hpad}px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;
    transition: 100ms;
    flex-grow: ${p => p.flex && 1};

    span {
      line-height: ${p => getSize(p.size).height}px;
      font-size: ${p => getSize(p.size).font}px;
    }

    &.disabled {
      background: #ddd;

      span {
        color: #aaa;
      }
    }
    svg {
      fill: ${colors.silver};
    }
  }

  .radio-option:hover:not(.disabled):not(.selected) {
    background: ${colors.white};
    transition: 100ms;
    .option-label {
      color: ${colors.brightBlue};
    }

    svg {
      fill: ${colors.brightBlue};
    }
  }

  .radio-option.selected {
    transition: 100ms;
    background: ${colors.iceBlue};

    &.disabled {
      background-image: linear-gradient(251deg, #888, #777);
    }

    span {
      color: ${colors.brightBlue};
    }

    svg {
      fill: ${colors.brightBlue};
    }
  }

  .tooltip-option {
    flex-grow: ${p => p.flex && 1};

    &:first-child {
      .radio-option {
        border-radius: 6px 0 0 6px;
      }
    }

    &:not(:first-child):not(:last-child) {
      .radio-option {
        border-left: none;
      }
    }

    &:last-child {
      .radio-option {
        border-radius: 0 6px 6px 0;
        border-left: none;
      }
    }
  }

  .option-label {
    color: ${colors.silver};
    font-size: 12px;
  }
`;

export const CalendarIcon = styled(calendarIcon)`
  width: 16px;
  height: 16px;
  margin-top: 10px;
`;

export const ListIcon = styled(listIcon)`
  width: 16px;
  height: 16px;
  margin-top: 10px;
`;

export const ScrumIcon = styled(scrumIcon)`
  width: 16px;
  height: 16px;
  margin-top: 10px;
`;
