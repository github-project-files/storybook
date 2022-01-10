// @flow

import styled, { keyframes } from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const TimerWrapper = styled.div`
  background: ${p => (p.status === 'started' ? colors.brightBlue : colors.white)};
  color: ${p => (p.status === 'started' ? colors.white : colors.brightBlue)};
  border: 1px solid ${colors.brightBlue};
  padding: 8px 20px;
  display: flex;
  border-radius: 20px;
  svg {
    stroke: ${p => (p.status === 'started' ? colors.white : colors.brightBlue)};
    height: 20px;
    width: 20px;
    margin-right: 5px;
    path.spinner-timer {
      animation: ${p => (p.status === 'started' ? `${spinAnimation} 1s linear infinite` : 'none')};
      transform-origin: center;
    }
  }
`;

export const DropdownWrapper = styled.div`
  @media (max-width: 425px) {
    margin: 10px 0px;
  }
  font-weight: 600;
  color: ${colors.slateGrey};
  cursor: pointer;
  display: flex;
  main {
    top: 50px;
    ul {
      li {
        font-size: 12px;
      }
    }
  }
`;
