// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const ButtonLabelWrapper = styled.div`
  display: flex;
  padding-top: ${({ label }) => (label ? '8px' : null)};
`;

export const RadioButtonWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 30px;
  border: 1px solid ${p => (p.checked ? colors.transparent : colors.silver)};
  background-color: ${({ checked }) => (checked ? colors.brightBlue : colors.white)};
  transition: all 100ms ease;
  cursor: pointer;

  /* checkmark */
  span {
    display: ${p => (p.checked ? 'block' : 'none')};
    position: absolute;
    width: 14px;
    height: 14px;
    border: 2px solid ${colors.white};
    border-radius: 50%;
    transition: all 100ms ease;
  }
`;

export const Label = styled.div`
  display: inline-block;
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
`;
