// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import closeIcon from 'assets/commonIcons/closeIcon.svg';

const ICON_DIMENSION = 12;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
`;

export const HeaderWrapper = styled.div`
  flex: 1;
  position: relative;
  font-size: ${p => p.fontSize || 24}px;
  font-weight: ${p => p.fontWeight || 'bold'};
  color: ${p => p.color || colors.slateGrey};
  background: ${p => p.icon === 'true' && colors.black};
  border-radius: 6px 6px 0 0;
`;

export const CloseWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${p => (p.icon === 'true' ? '-25' : '-3')}px;
  right: ${p => (p.icon === 'true' ? '-25' : '0')}px;
  width: 18px;
  height: 18px;
  margin: 6px;
  cursor: pointer;
  border-radius: 50%;
  background: ${colors.white};
`;

export const CloseIcon = styled(closeIcon)`
  width: ${ICON_DIMENSION}px;
  height: ${ICON_DIMENSION}px;
  fill: ${p => p.color || colors.black};
`;

export const HeaderAlterate = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${colors.paleGrey};
  > div {
    display: flex;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const CloseBtnWrapper = styled.span`
  display: flex;
  cursor: pointer;
  svg {
    width: 12px;
    height: 12px;
  }
`;