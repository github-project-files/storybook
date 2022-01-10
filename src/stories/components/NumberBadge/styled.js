// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

/**
 * Determine the numberBadge's size based on the "size" prop
 * @param {string} size
 * @return {string}
 */
function getSize(size) {
  switch (size) {
    case 'lg':
      return { hpad: 1, vpad: 8, fontSize: 12 };
    case 'sm':
    default:
      return { hpad: 1, vpad: 4, fontSize: 10 };
  }
}

export const NumberBadgeWrapper = styled.span`
  display: inline-block;
  padding: ${p => getSize(p.size).hpad}px ${p => getSize(p.size).vpad}px;
  border-radius: 8px;
  font-size: ${p => getSize(p.size).fontSize}px;
  font-weight: 600;
  text-align: center;
  color: ${colors.white};
  background-image: linear-gradient(
    225deg,
    ${p => (p.theme === 'red' ? '#fb5447, #cf1324' : '#00aeff, #0076ff')}
  );
  min-width: 16px;
`;
