// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: ${colors.white};
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid ${colors.paleGrey};
`;

export const Tab = styled.div`
  font-size: 14px;
  color: ${p => {
    if (p.active) {
      if (p.theme === 'blue') {
        return colors.brightBlue;
      }
      return colors.darkGrey;
    }
    return colors.steel;
  }};
  font-weight: ${p => (p.active ? 600 : 'none')};
  transition: background-color 200ms ease;
  text-align: center;
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: ${p => {
    if (p.active) {
      if (p.theme === 'blue') {
        return `2px solid ${colors.brightBlue}`;
      }
      return `1px solid ${colors.strawberry}`;
    }
    return `1px solid ${colors.paleGrey}`;
  }};
  margin-bottom: -1px;

  &:hover {
    cursor: pointer;
    color: ${p => (!p.active ? 'null' : `${colors.brightBlue}`)};
    border-bottom: ${p => (p.active ? 'null' : `1px solid ${colors.slateGrey}`)};
  }

  @media (min-width: 1200px) {
  }
`;
