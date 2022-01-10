// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const PageWrapper = styled.li`
  background-color: ${p => (p.isActive ? colors.brightBlue : colors.white)};
  color: ${colors.paleGrey};
  font-size: 14px;
  font-weight: 600;
  height: 35px;
  padding: 8px 15px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0px;
  /* background-clip: padding-box; */
  span {
    color: ${p => (p.isActive ? colors.white : colors.slateGrey)};
    cursor: pointer;
  }
`;

export const Wrapper = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: inline-flex;
  flex-direction: ${p => (p.verticalAlign ? 'column' : 'row')};
  @media (max-width: 768px) {
    flex-direction: column;
  }

  li:first-child {
    left-border-radius: 3px;
  }

  li:last-child {
    right-border-radius: 3px;
  }
`;
