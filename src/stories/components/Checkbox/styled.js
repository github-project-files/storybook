// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const DisabledWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  display: block;
  margin: 0 auto;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid ${colors.paleGrey};
  background-color: ${colors.lightGrey};
  transition: all 100ms ease;
  cursor: default;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxElem = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  display: ${p => (p.label ? 'inline-block' : 'block')};
  margin: ${p => (p.label ? 0 : '0 auto')};
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid ${p => (p.checked ? colors.transparent : colors.silver)};
  background-color: ${p => (p.disabled ? colors.silver : colors.white)};
  background-image: ${p => p.checked && 'linear-gradient(223deg, #00aeff, #0076ff)'};
  transition: all 100ms ease;
  cursor: pointer;

  &:hover {
    background-image: ${p => p.checked && 'none'};
    background-color: ${p => (p.checked ? colors.white : colors.iceBlue)};
    border-color: ${colors.brightBlue};

    > span {
      border-color: ${colors.brightBlue};
    }
  }

  /* checkmark */
  span {
    display: ${p => (p.checked ? 'block' : 'none')};
    position: absolute;
    top: 1px;
    left: 5px;
    width: 5px;
    height: 10px;
    border: solid ${colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    transition: all 100ms ease;
  }
`;

export const Label = styled.label`
  display: inline-block;
  ${({ labelWidth }) =>
    labelWidth
      ? `width: ${labelWidth}px
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`
      : null};
  margin-left: 10px;
  cursor: pointer;
`;
