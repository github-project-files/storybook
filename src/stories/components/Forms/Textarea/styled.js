// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { inputStyle } from '../FormStyles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  textarea {
    ${inputStyle}
    padding: 10px;
    height: ${p => (p.height ? p.height : 150)}px;
  }
`;
