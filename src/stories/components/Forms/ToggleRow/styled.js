// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
`;

export const Label = styled.div`
  color: ${colors.charcoalGrey};
  font-size: 14px;
  font-weight: 600;
  display: block;
  padding-left: 20px;
  padding-bottom: 0;
`;

export const Description = styled.div`
  color: ${colors.steel};
  font-size: 13px;
  font-style: italic;
  padding-left: 20px;
`;
