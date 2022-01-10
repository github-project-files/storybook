// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import closeIcon from 'assets/commonIcons/closeIcon.svg';

export const ExportStatusWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const CloseBtn = styled(closeIcon)`
  position: absolute;
  right: 32px;
  width: 12px;
  height: 12px;
  top: 35px;
  fill: ${colors.steel};
  cursor: pointer;
  &:hover {
    fill: ${colors.slateGrey};
  }
  display: ${p => p.visible ? 'inline-flex' : 'none'};
  pointer-events: ${p => p.loading ? 'none' : 'all'};
  opacity: ${p => p.loading ? 0.5 : 1};
`;
