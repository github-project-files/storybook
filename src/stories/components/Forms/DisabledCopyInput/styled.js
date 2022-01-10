// @flow

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

export const CopyButton = styled.button`
  position: absolute;
  right: 0;
  height: 37px;
  padding: 0px 10px;
  background: transparent;
  border: 1px solid ${colors.brightBlue};
  border-radius: 0px 6px 6px 0px;
  color: ${colors.brightBlue};
`;
