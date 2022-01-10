// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import closeIcon from 'assets/commonIcons/closeIcon.svg';

const ICON_DIMENSION = 12;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  /* padding-bottom: 10px; */
`;

export const CloseIcon = styled(closeIcon)`
  width: ${ICON_DIMENSION}px;
  height: ${ICON_DIMENSION}px;
  fill: ${p => p.color || colors.black};
`;

export const HeaderAlterate = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${colors.paleGrey};
`;

export const TitleWrapper = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  margin-right: ${p => (p.icon ? '20px' : 0)};
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const CloseBtnWrapper = styled.span`
  display: flex;
  cursor: pointer;
  svg {
    width: 12px;
    height: 12px;
  }
`;
