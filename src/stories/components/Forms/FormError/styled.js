// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { inputErrorFontStyle } from '../FormStyles';

export const Wrapper = styled.label`
  font-size: 14px;
  display: block;
  padding: 5px 0 0 2px;
  ${inputErrorFontStyle}
`;
