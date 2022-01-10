// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

/**
 * Determine the button's accent color based on the "color" prop
 * @param {string} theme
 * @return {string}
 */
function getAccentColor(theme) {
  switch (theme) {
    case 'blue':
      return colors.brightBlue;
    case 'red':
      return colors.strawberry;
    default:
      return '';
  }
}

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  line-height: 34px;
  background: ${p => getAccentColor(p.theme)};

  border-radius: 50%;
  color: ${colors.white};
  cursor: pointer;

  span {
    width: 100%;
    text-align: center;
  }

  &:hover {
    box-shadow: 0 2px 10px 0 rgba(40, 44, 49, 0.2);
  }
`;
