// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import closeIcon from 'assets/commonIcons/closeIcon.svg';

/**
 * Determine the alert bar's accent color based on the "theme" prop
 * @param {string} theme
 * @return {string}
 */
function getAccentColor(theme) {
  switch (theme) {
    case 'none':
      return;
    case 'gray':
      return colors.silver;
    case 'green':
      return colors.mint;
    case 'blue':
      return colors.reallyLightBlue;
    case 'yellow':
      return colors.lightTan;
    case 'red':
      return colors.peach;
    default:
      return colors.peach;
  }
}

/**
 * Determine the alert bar's font color based on the "color" prop
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
      return colors.jungleGreen;
    case 'red':
      return colors.strawberry;
    default:
      return colors.coral;
  }
}
export const CloseIcon = styled(closeIcon)`
  height: 12px;
  width: 12px;
  cursor: pointer;
  position: absolute;
  right: 20px;
`;

export const Wrapper = styled.div`
  display: ${p => (p.theme === 'none' ? 'none' : 'flex')};
  flex: 1;
  padding: 5px;
  background-color: ${p => getAccentColor(p.theme)};
  color: ${p => getFontColor(p.theme)};
  font-size: 14px;
  justify-content: center;
  align-items: center;
  padding-right: ${p => (p.dismissable ? '50px' : '0px')};
  a {
    color: ${p => getFontColor(p.theme)};
  }
  + ${CloseIcon} {
    fill: ${p => getFontColor(p.theme)};
  }
`;

export const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
