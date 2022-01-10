// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

/**
 * Determine the badge's accent color based on the "color" prop
 * @param {string} theme
 * @return {string}
 */
function getAccentColor(theme) {
  switch (theme) {
    case 'none':
      return;
    case 'gray':
      return colors.paleGrey;
    case 'green':
      return colors.shamrockGreen;
    case 'blue':
      return colors.iceBlue;
    case 'yellow':
      return colors.lightTan;
    default:
      return colors.peach;
  }
}

/**
 * Determine the badge's font color based on the "color" prop
 * @param {string} theme
 * @return {string}
 */
function getFontColor(theme) {
  switch (theme) {
    case 'none':
      return;
    case 'gray':
      return colors.white;
    case 'blue':
      return colors.dodgerBlue;
    case 'yellow':
      return colors.burntYellow;
    case 'green':
      return colors.white;
    default:
      return colors.coral;
  }
}

export const Wrapper = styled.div`
  display: ${p => (p.theme === 'none' ? 'none' : 'inline-block')};
  padding: 0 8px;
  height: 24px;
  border-radius: 4px;
  background-color: ${p => getAccentColor(p.theme)};
  color: ${p => getFontColor(p.theme)};
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
  text-align: center;
`;
