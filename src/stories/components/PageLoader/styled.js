// @flow

import styled, { keyframes } from 'styled-components';
import { colors } from 'utils/StyleGuide';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg); }
  to {
    transform: rotate(1080deg);
  }
`;

const spinAnimationReverse = keyframes`
  from {
    transform: rotate(0deg); }
  to {
    transform: rotate(-1080deg);
  }
`;

export const Wrapper = styled.div`
  width: ${p => (p.inline ? 'inherit' : `100%`)};
  height: ${p => (p.autoHeight ? 'auto' : '100%')};
  display: flex;
`;

export const InnerWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

export const LoaderWrapper = styled.div`
  margin: ${p => (p.inline ? `0 auto` : `40px auto`)};
  text-align: center;
  display: flex;
  div {
    position: absolute;
    svg {
      width: 100%;
      height: 100%;
      fill: ${colors.silver};
    }
  }
  div:first-child {
    width: 64px;
    height: 64px;
    animation: ${spinAnimation} 10s linear infinite;
  }

  div:nth-child(2) {
    width: 48px;
    height: 48px;
    margin-top: -20px;
    margin-left: 54px;
    animation: ${spinAnimationReverse} 10s linear infinite;
    opacity: 0.7;
  }

  div:nth-child(3) {
    width: 36px;
    height: 36px;
    margin-top: 25px;
    margin-left: 70px;
    animation: ${spinAnimation} 10s linear infinite;
    opacity: 0.4;
  }
`;

export const LoaderText = styled.div`
  font-family: 'Open-sans', 'Helvetica', arial, sans-serif;
  color: ${colors.silver};
  font-weight: 400;
  letter-spacing: 0.15em;
  padding-top: 30px;
`;
