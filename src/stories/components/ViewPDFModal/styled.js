// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import download from 'assets/commonIcons/requestsIcon.svg';

export const DownloadWrapper = styled.span`
  position: absolute;
  right: 60px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const DownloadIcon = styled(download)`
  width: 18px;
  height: 18px;

  g {
    fill: ${colors.darkGrey};
  }
  &:hover > g {
    fill: ${colors.silver};
  }
`;
