// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { inputStyle } from '../FormStyles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    ${inputStyle};
    padding: 0 10px;
  }
`;

export const CustomError = styled.div`
  width: 330px;
  height: 20px;
  font-size: 14px;
  color: ${colors.strawberry};
  display: contents;
`;
