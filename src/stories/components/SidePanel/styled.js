// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { lighten } from 'polished';

const SIDE_MENU_WIDTH = 260;
const OVERLAY_OFFSET = 50;
/**
 * Determine if offset for transform should
 * be positive on negative based on side prop
 * @param {string} side
 * @param {string} width
 * @return {number}
 */
function generateOffset(side, width) {
  if (width === '100%') {
    // eslint-disable-next-line no-restricted-globals
    return side === 'left' ? `-${screen.width}` : screen.width;
  }

  return side === 'left' ? `-${width}` : width;
}

/**
 * Determine if box-shadow should
 * be offset from the left or right
 * based on side prop
 * @param {string} side
 * @return {string}
 */
function generateBoxShadow(side) {
  return side === 'left' ? '2px 7px 10px rgba(0,0,0,0.2)' : '-5px 0 30px rgba(0, 0, 0, 0.2)';
}

/* eslint-disable no-restricted-globals */
export const Wrapper = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  right: ${p => p.side === 'right' && 0};
  left: ${p => p.side === 'left' && 0};
  width: ${p =>
    p.width === '100%' ? `calc(100% - ${SIDE_MENU_WIDTH + OVERLAY_OFFSET}px)` : `${p.width}px`};
  height: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  box-shadow: ${p => p.show && generateBoxShadow(p.side)};
  z-index: 11;
  transition: all 300ms ease;
  transform: translateX(${p => (p.show ? 0 : generateOffset(p.side, p.width))}px);
  transition-property: width, transform;

  @media (min-width: 1200px) {
    left: ${p => p.side === 'left' && '260px'};
  }

  @media (max-width: 1200px) {
    width: ${p => (p.width === '100%' ? `calc(100% - ${OVERLAY_OFFSET}px)` : `${p.width}px`)};
  }

  @media (max-width: 500px) {
    width: ${screen.width}px;
    transform: translateX(${p => (p.show ? 0 : generateOffset(p.side, '100%'))}px);
  }
`;
/* eslint-enable no-restricted-globals */

Wrapper.defaultProps = {
  side: 'right',
  width: 500,
};

export const Header = styled.div`
  display: inline-flex;
  justify-content: space-between;
  margin-top: 0;
  padding: 20px;
  width: 100%;
  height: 60px;
  background: #eee;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.steel};
`;

export const InnerWrapper = styled.div`
  flex: 1;
  width: '100%';
  overflow-y: auto;
  overflow-x: hidden;

  /* scrollbar */
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #4d5259;
  }
  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${lighten(0.2, '#4d5259')};
    }
  }
`;
