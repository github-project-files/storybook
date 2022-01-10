// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
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

  .react-select__control-is-disabled {
    background-color: #eee;
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

  .react-select__option {
    :hover {
      background-color: ${colors.iceBlue};
      color: ${colors.brightBlue};
    }
  }

  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.paleGrey};
    :hover {
      background-color: ${p => p.theme.colors.alabaster};
    }
  }

  .react-select__clear-indicator {
    cursor: pointer;
  }

  .react-select__control--is-disabled {
    background-color: ${p => p.theme.colors.lightGrey};
  }
`;
