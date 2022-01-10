// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const HeaderWrapper = styled.div`
  display: inline-grid;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.slateGrey};
  span {
    font-size: 15px;
    font-weight: 500;
  }
`;
