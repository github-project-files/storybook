// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { lighten } from 'polished';
import { colors } from 'utils/StyleGuide';
import { getGradientColors } from 'utils/StyleHelpers';

/**
 * Determine the button's accent color based on the "color" prop
 * @param {string} theme
 * @return {string}
 */
function getAccentColor(theme) {
  switch (theme) {
    case 'blue':
      return colors.brightBlue;
    case 'green':
      return colors.shamrockGreen;
    case 'dark-green':
      return colors.jungleGreen;
    case 'white':
      return colors.alabaster;
    case 'red':
      return colors.strawberry;
    case 'silver':
      return colors.silver;
    case 'cancel':
    case 'transparent':
    case 'filter':
    case 'filter-active':
    case 'blue-bordered':
    case 'steel':
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
    case 'transparent':
    case 'blue-bordered':
      return colors.brightBlue;
    case 'steel':
      return colors.steel;
    case 'red':
    case 'blue':
    case 'green':
    case 'blue-gradient':
    case 'red-gradient':
    case 'dark-green':
    case 'white-outline':
      return colors.white;
    case 'cancel':
    case 'white':
    case 'filter':
    case 'filter-active':
    default:
      return colors.slateGrey;
  }
}

/**
 * Determine the button's font color
 * on hover based on the "theme" prop
 * @param {string} theme
 * @return {string}
 */
function getHoverFontColor(theme) {
  switch (theme) {
    case 'red':
    case 'blue':
    case 'green':
    case 'dark-green':
    case 'blue-gradient':
    case 'red-gradient':
    case 'white-outline':
      return colors.white;
    case 'white':
    case 'cancel':
    case 'transparent':
    case 'filter':
    case 'filter-active':
    case 'blue-bordered':
    case 'steel':
    default:
      return colors.brightBlue;
  }
}

/**
 * Determine the button's border color based on the "theme" prop
 * @param {string} theme
 * @return {string}
 */
function getBorderColor(theme) {
  switch (theme) {
    case 'white':
      return '#ccc';
    case 'filter':
      return colors.silver;
    case 'filter-active':
    case 'blue-bordered':
      return colors.brightBlue;
    case 'white-outline':
      return colors.white;
    default:
      return '';
  }
}

/**
 * Determine the button's size based on the "size" prop
 * @param {string} size
 * @return {string}
 */
function getSize(size) {
  switch (size) {
    case 'xs':
      return { width: 36, height: 36, font: 12, vpad: 0, hpad: 0 };
    case 'sm':
      return { width: 60, height: 36, font: 12, vpad: 4, hpad: 8 };
    case 'lg':
      return { width: 70, height: 48, font: 16, vpad: 6, hpad: 20 };
    case 'xlg':
      return { width: 80, height: 42, font: 14, vpad: 8, hpad: 15 };
    case 'xl':
      return { width: 100, height: 60, font: 20, vpad: 8, hpad: 24 };
    case 'xxl':
      return { width: 150, height: 42, font: 14, vpad: 10, hpad: 42 };
    case 'xxxl':
      return { width: 360, height: 50, font: 16, vpad: 0, hpad: 0 };
    default:
      return { width: 100, height: 36, font: 14, vpad: 6, hpad: 16 };
  }
}

/**
 * Determine the button's box-shadow
 *  on hover based on the "theme" prop
 * @param {string} theme
 * @return {string} box-shadow property value
 */
function getBoxShadow(theme) {
  switch (theme) {
    case 'filter':
    case 'filter-active':
    case 'transparent':
      return '0 2px 10px 0 rgba(40, 44, 49, 0.2)';
    default:
      return 'none';
  }
}

/**
 * Determine the button's icon
 * color based on the "theme" prop
 * @param {string} theme
 * @return {string} fill property value
 */
function getFillColor(theme) {
  switch (theme) {
    case 'cancel':
    case 'blue-bordered':
      return colors.brightBlue;
    case 'red':
    case 'green':
    case 'dark-green':
    case 'blue':
    case 'red-gradient':
    case 'blue-gradient':
      return colors.white;
    case 'white':
    case 'transparent':
    case 'filter':
    case 'filter-active':
    case 'steel':
    default:
      return colors.steel;
  }
}

/**
 * Determine the button's icon
 * color based on the "theme" prop
 * @param {string} theme
 * @return {string} fill property value
 */
function getHoverFillColor(theme) {
  switch (theme) {
    case 'red':
    case 'green':
    case 'dark-green':
    case 'blue':
    case 'red-gradient':
    case 'blue-gradient':
      return colors.white;
    case 'white':
    case 'transparent':
    case 'filter':
    case 'filter-active':
    case 'cancel':
    case 'blue-bordered':
    case 'steel':
    default:
      return colors.brightBlue;
  }
}

export const Wrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 6px;
  color: ${p => getFontColor(p.theme)};
  font-size: ${p => getSize(p.size).font}px;
  font-weight: ${p => (p.thin ? 400 : 600)};
  height: ${p => getSize(p.size).height}px;
  padding: ${p => getSize(p.size).vpad}px ${p => getSize(p.size).hpad}px;
  border-radius: ${p => (p.pill ? 30 : 6)}px;
  text-align: center;
  border: ${p =>
    getBorderColor(p.theme)
      ? `1px solid ${getBorderColor(p.theme)}`
      : `1px solid ${colors.transparent}`};
  background-clip: padding-box;
  background-color: ${({ theme, disabledBackground, disabled }) =>
    disabled && disabledBackground ? getAccentColor(disabledBackground) : getAccentColor(theme)};
  background-image: ${p =>
    getGradientColors(p.theme).length === 2
      ? `linear-gradient(251deg, ${getGradientColors(p.theme)[0]}, ${
          getGradientColors(p.theme)[1]
        })`
      : 'none'};
  opacity: ${p => (!p.loading && p.disabled ? 0.5 : 1)};
  letter-spacing: -0.34px;
  min-width: ${p => getSize(p.size).width}px;
  transition: all 150ms ease;

  svg {
    fill: ${p => getFillColor(p.theme)};
    margin-right: 5px;
  }

  &:hover {
    cursor: ${p => (p.disabled ? 'default' : 'pointer')};
    background-color: ${p =>
      p.theme === 'cancel' || p.theme === 'white-outline'
        ? 'rgba(255,255,255,0.12)'
        : lighten(0.15, getAccentColor(p.theme))};
    box-shadow: ${p => getBoxShadow(p.theme)};
    color: ${p => getHoverFontColor(p.theme)};
    background-image: ${p =>
      getGradientColors(p.theme).length === 2
        ? `linear-gradient(251deg, ${lighten(0.15, String(getGradientColors(p.theme)[0]))},
      ${lighten(0.15, String(getGradientColors(p.theme)[1]))})`
        : 'none'};
    border: ${p => p.theme === 'filter' && '1px solid transparent'};

    svg {
      fill: ${p => getHoverFillColor(p.theme)};
    }
  }

  &:focus {
    text-decoration: none;
    outline: none;
  }
`;
