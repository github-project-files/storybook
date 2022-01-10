// @flow

import styled from 'styled-components';
import { lighten } from 'polished';
import { colors } from 'utils/StyleGuide';
import close from '../../assets/commonIcons/closeIcon.svg';

/**
 * Determine the dropdownmenu's direction based on the "direction" prop
 * @param {string} offsetX
 * @param {string} offsetY
 * @param {string} direction
 * @return {string}
 */
function getDirection(offsetX, offsetY, direction) {
  // eslint-disable-next-line no-param-reassign
  offsetX = offsetX || '0';
  // eslint-disable-next-line no-param-reassign
  offsetY = offsetY || '10';

  // set 0 for undefined fields to prevent flow errors
  // set '0' for '0px'
  switch (direction) {
    case 'left':
      return { top: 0, bottom: 0, left: 0, right: offsetX };
    case 'right':
      return { top: 0, bottom: 0, left: offsetX, right: 0 };
    case 'top':
      return { top: 0, bottom: offsetY, left: 0, right: 0 };
    case 'top-left':
      return { top: 0, bottom: offsetY, left: 0, right: offsetX };
    case 'top-right':
      return { top: 0, bottom: offsetY, left: offsetX, right: 0 };
    case 'bottom-left':
      return { top: offsetY, bottom: 0, left: 0, right: offsetX };
    case 'bottom-right':
      return { top: offsetY, bottom: 0, left: offsetX, right: 0 };
    case 'bottom':
    default:
      return { top: offsetY, bottom: 0, left: '0', right: 0 };
  }
}

export const DropdownWrapper = styled.span`
  position: relative;
  cursor: pointer;
`;

export const MenuIconWrapper = styled.span`
  margin-right: 10px;
  height: 14px;
`;

export const DropdownInner = styled.main`
  position: absolute;
  top: ${p =>
    !!getDirection(p.offsetX, p.offsetY, p.direction).top &&
    `${getDirection(p.offsetX, p.offsetY, p.direction).top}px`};
  bottom: ${p =>
    !!getDirection(p.offsetX, p.offsetY, p.direction).bottom &&
    `${getDirection(p.offsetX, p.offsetY, p.direction).bottom}px`};
  left: ${p =>
    !!getDirection(p.offsetX, p.offsetY, p.direction).left &&
    `${getDirection(p.offsetX, p.offsetY, p.direction).left}px`};
  right: ${p =>
    !!getDirection(p.offsetX, p.offsetY, p.direction).right &&
    `${getDirection(p.offsetX, p.offsetY, p.direction).right}px`};
  width: ${p => (p.width ? `${p.width}px` : 'inherit')};
  min-width: 94px;
  max-height: ${p => p.maxHeight && `${p.maxHeight}px`};
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 999;

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

export const DropdownHeader = styled.header`
  position: sticky;
  top: 0;
  width: ${p => (p.width ? `${p.width}px` : '100%')};
  padding: 8px 10px;
  background-color: ${colors.white};
  font-size: 12px;
`;

export const DropdownList = styled.ul`
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  text-align: left;
`;

export const DropdownListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  transition: all 100ms ease;
  cursor: pointer;

  &:hover {
    color: ${colors.brightBlue};
    background-color: ${colors.iceBlue};
  }
  ${MenuIconWrapper} {
    svg {
      height: 12px;
      width: 12px;
    }
  }
`;

export const DropdownListItemInner = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SelectionIcon = styled.span`
  width: 6px;
  height: 6px;
  margin-left: ${p => (p.deleteItem ? '10px' : 'auto')};
  border: 1px solid ${p => (p.selected ? colors.shamrockGreen : colors.silver)};
  background-color: ${p => p.selected && colors.shamrockGreen};
  border-radius: 50%;
`;

export const AssigneeWrapper = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const DeleteListItem = styled.span`
  margin-left: auto;

  &:hover {
    svg {
      fill: ${colors.steel};
    }
  }
`;

export const CloseIcon = styled(close)`
  width: 8px;
  height: 8px;
  fill: ${colors.silver};
`;

export const NestedChev = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-color: ${colors.slateGrey};
  vertical-align: middle;
  margin: 0 5px 0 10px;
  top: -3px;
  position: relative;
`;
