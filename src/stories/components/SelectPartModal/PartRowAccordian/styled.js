// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import downArrowIcon from 'assets/commonIcons/downArrow.svg';

export const ChildRow = styled.div`
  display: ${p => (p.active ? 'table-row' : 'none')};
  background-color: ${p => (p.ifSelected ? colors.alabaster : 'none')};
`;

export const ChildCell = styled.span`
  display: table-cell;
  text-align: ${p => (p.align ? p.align : 'right')};
  padding: 12px;
  font-size: 12px;
  &:not(:first-of-type) {
    border-bottom: 1px solid ${colors.paleGrey};
  }
  &:first-of-type {
    border-right: 1px solid ${colors.paleGrey};
    background: ${colors.white};
  }
`;

export const DownArrow = styled(downArrowIcon)`
  height: 14px;
  width: 14px;
  margin-right: 12px;
  fill: ${colors.silver};
  transition: all 250ms ease;
  vertical-align: middle;
  left: 8px;
  position: relative;
  transform: rotate(${p => (p.up === 'true' ? '180deg' : '0deg')});
`;
