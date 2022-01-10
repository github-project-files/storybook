// @flow

import styled, { keyframes } from 'styled-components';
import { colors } from 'utils/StyleGuide';
import loaderIcon from './img/loader.svg';

/**
 * Determine the Loader's size based on the "size" prop
 * @param {string} size
 * @return {string}
 */
function getSize(size) {
  switch (size) {
    case 'xs':
      return { parentSize: 16, childSize: 12, margin: 3 };
    case 'sm':
      return { parentSize: 24, childSize: 18, margin: 4 };
    case 'lg':
    default:
      return { parentSize: 36, childSize: 24, margin: 6 };
  }
}

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
  width: inherit;
  height: auto;
  display: ${p => (p.inline ? 'inline-flex' : 'flex')};
`;

export const InnerWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

export const LoaderWrapper = styled.div`
  display: flex;

  div {
    position: absolute;
    svg {
      width: 100%;
      height: 100%;
      fill: ${colors.silver};
    }
  }
`;

export const LoaderIcon = styled(loaderIcon)`
  height: ${p => getSize(p.size).parentSize}px;
  width: ${p => getSize(p.size).parentSize}px;
  fill: ${colors.silver};
  animation: ${spinAnimation} 10s linear infinite;

  &:first-child {
    height: ${p => getSize(p.size).childSize}px;
    width: ${p => getSize(p.size).childSize}px;
    opacity: 0.5;
    margin-right: -${p => getSize(p.size).margin}px;
    margin-top: ${p => getSize(p.size).margin}px;
    animation: ${spinAnimationReverse} 10s linear infinite;
  }

  &:last-child {
    height: ${p => getSize(p.size).childSize}px;
    width: ${p => getSize(p.size).childSize}px;
    opacity: 0.5;
    margin-left: -${p => getSize(p.size).margin}px;
    margin-top: ${p => getSize(p.size).margin}px;
    animation: ${spinAnimationReverse} 10s linear infinite;
  }
`;
