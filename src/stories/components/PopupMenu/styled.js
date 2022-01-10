// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

/**
 * Determine the button's accent color based on the "color" prop
 * @param {string} theme
 * @return {string}
 */
function getAccentColor(theme) {
  switch (theme) {
    case 'gray':
      return colors.paleGrey;
    case 'blue':
      return colors.brightBlue;
    case 'green':
      return colors.shamrockGreen;
    case 'yellow':
      return colors.burntYellow;
    default:
      return colors.strawberry;
  }
}

export const Wrapper = styled.span`
  color: ${colors.white};
  font-size: 13px;
  font-weight: ${p => (p.thin ? 400 : 600)};
  border-radius: 6px;
  padding: ${p => (p.thin ? '2px 4px' : '3px 5px')};
  text-align: center;
  border: none;
  background-color: ${p => getAccentColor(p.theme)};
  opacity: ${p => (!p.loading && p.disabled ? 0.5 : 1)};
  letter-spacing: -0.34px;
`;
