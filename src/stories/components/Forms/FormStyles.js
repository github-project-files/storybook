// @flow

import { colors } from 'utils/StyleGuide';
import { css } from 'styled-components';

export const INPUT_HEIGHT = 37;
export const LINE_HEIGHT = 22;
export const INPUT_BORDER_RADIUS = 6;

export const inputFontStyle = css`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${colors.slateGrey};
`;

export const inputBorderStyle = css`
  border: 1px solid ${colors.paleGrey};
`;

export const inputDisabledStyle = css`
  opacity: 0.5;
`;

export const inputErrorBorderStyle = css`
  border: 1px solid ${colors.strawberry};
`;

export const inputErrorFontStyle = css`
  color: ${colors.strawberry};
`;

export const inputFocusStyle = css`
  border-color: ${colors.brightBlue};
`;

export const inputPlaceholderStyle = css`
  color: #aaaaaa;
`;

export const inputStyle = css`
  ${inputFontStyle}
  ${inputBorderStyle}
  width: 100%;
  border-radius: ${INPUT_BORDER_RADIUS}px;
  background-color: ${colors.white};
  height: ${INPUT_HEIGHT}px;
  min-height: ${INPUT_HEIGHT}px;
  outline: none;

  ::placeholder {
    ${inputPlaceholderStyle}
  }

  :disabled {
    ${inputDisabledStyle}
  }

  ${p => (p.error ? inputErrorBorderStyle : '')};
`;
