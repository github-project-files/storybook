// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { darken } from 'polished';
import ReactToggle from 'react-toggle';

export const ReactToggleStyled = styled(ReactToggle)`
  &.react-toggle--checked {
    .react-toggle-track {
      background: linear-gradient(240deg, #00aeff, #0076ff);
    }
    .react-toggle-thumb {
      left: 21px;
    }
  }

  &.react-toggle--focus {
    .react-toggle-thumb {
      box-shadow: none;
    }
  }

  .react-toggle-track {
    width: 44px;
    height: 24px
    border-radius: 15.5px;
    /* border: solid 1.5px rgba(0, 0, 0, 0.1); */
    background: ${colors.paleGrey};
  }

  &:hover {
    &.react-toggle--checked {
      .react-toggle-track {
        background: linear-gradient(223deg, #2bbbfe, #0076ff) !important;
      }
    }
    .react-toggle-track {
      background: ${darken(0.2, colors.paleGrey)} !important;
    }
  }

  &:active {
    .react-toggle-thumb {
      box-shadow: none !important;
    }
  }

  .react-toggle-thumb {
    width: 20px;
    height: 20px;
    box-shadow: 0 3px 1px 0 rgba(54, 56, 57, 0.2);
    border: none;
    /* margin-top: 1px; */
    margin: 1px;
  }
`;
