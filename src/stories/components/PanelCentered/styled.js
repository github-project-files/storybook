// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  position: relative;
  margin: 30px auto 20px auto;
  background-color: ${colors.white};
  border: 1px solid ${colors.paleGrey};
  border-radius: 8px;
  padding: 20px;
  width: 100%;

  /* Width only matters in desktop mode */
  @media (min-width: 1200px) {
    padding: 40px 20px;
    width: ${p => (p.width ? `${p.width}px` : '100%')};
  }
`;
