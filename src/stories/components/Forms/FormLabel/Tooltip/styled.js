// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const TooltipPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  margin: 0 5px;
  user-select: none;
  color: ${colors.white};
  background-color: ${colors.steel};
  border-radius: 50%;

  :after {
    content: '?';
  }
`;

export const TooltipWrapper = styled.div`
  .tooltip-container {
    width: 365px;
    top: -15px !important;
    color: ${colors.white};
    background-color: ${colors.darkBlue};
    font-size: 14px;
    border: none;
  }

  .tooltip-body {
    margin: 5px 20px 5px 30px;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    line-height: 1.7;

    li {
      margin-bottom: 5px;
    }

    &__single-message {
      margin: 5px 20px 5px 10px;
    }
  }

  .tooltip-arrow {
    top: 10px !important;

    :after {
      border-color: transparent ${colors.darkBlue} transparent transparent !important;
    }

    :before {
      border-color: transparent transparent transparent ${colors.darkBlue} !important;
    }
  }
`;
