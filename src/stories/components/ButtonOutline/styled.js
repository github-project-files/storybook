// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import Button from 'components/Button';

/**
 * Determine the button's accent color based on the "color" prop
 * @param {string} theme
 * @return {string}
 */
function getAccentColor(theme) {
  switch (theme) {
    case 'blue':
      return colors.iceBlue;
    default:
      return colors.transparent;
  }
}

/**
 * Determine the button's font color based on the "theme" prop
 * @param {string} theme
 * @return {string}
 */
function getFontColor(theme) {
  switch (theme) {
    case 'blue':
      return colors.brightBlue;
    default:
      return colors.slateGrey;
  }
}

/**
 * Determine the button's border color based on the "theme" prop
 * @param {string} theme
 * @return {string}
 */
function getBorderColor(theme) {
  switch (theme) {
    case 'blue':
      return colors.brightBlue;
    default:
      return '';
  }
}

export const Wrapper = styled(Button)`
  background: ${colors.transparent};
  border: 1px solid ${p => getBorderColor(p.theme)};
  color: ${p => getFontColor(p.theme)};
  min-width: inherit;
  height: auto;

  &:hover,
  &:active,
  &:visited {
    background: ${p => getAccentColor(p.theme)};
    color: ${p => getFontColor(p.theme)};
  }
`;
