// @flow

import styled from 'styled-components';
import downArrowIcon from 'assets/commonIcons/downArrow.svg';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  box-shadow: ${p => (p.useDefaultStyle ? '2px 2px 5px rgba(0,0,0,.3)' : 'none')};
  border-radius: ${p => (p.useDefaultStyle ? '6px' : '0px')};
  border: ${p => (p.useDefaultStyle ? `solid 1px ${colors.paleGrey}` : 'none')};
`;

export const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
`;

export const Body = styled.div`
  background-color: ${colors.alabaster};
  height: ${p => (p.open.toString() === 'true' ? 'auto' : '0')};
  overflow: ${p => (p.open.toString() === 'true' ? 'visible' : 'hidden')};
`;

export const DownArrow = styled(downArrowIcon)`
  height: 32px;
  width: 32px;
  margin-right: 12px;
  fill: ${colors.silver};
  transform: rotate(${p => (p.up === 'true' ? '180deg' : '0deg')});
`;
