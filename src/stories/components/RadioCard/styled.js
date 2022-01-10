// @flow

import styled, { css } from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  padding: 15px;
  border-radius: 5px;
  border-color: ${p => (p.selected ? colors.brightBlue : colors.silver)};
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
  box-shadow: ${p => p.selected ? `0 0 0 1px ${colors.brightBlue}` : ''};
`;

const checkboxAfter = css`
  content: '';
  position: absolute;
  display: inline-block;
  width: 8px;
  height: 8px;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background-color: ${colors.brightBlue};
`;

export const RadioCheck = styled.div`
  width: 16px;
  height: 16px;
  border-width: 2px;
  border-style: solid;
  border-color: ${p => (p.selected ? colors.brightBlue : colors.paleGrey)};
  border-radius: 50%;
  position: relative;
  &:after {
    ${p => p.selected ? checkboxAfter : ''};
  }
`;

export const Content = styled.div`
  padding-left: 10px;
`;

export const Title = styled.div`
  font-weight: ${p => p.selected ? 700 : 600};
`;

export const SubTitle = styled.div`
  color: ${colors.steel};
`;
