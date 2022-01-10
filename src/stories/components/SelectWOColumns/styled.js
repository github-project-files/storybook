// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Label = styled.div`
  font-weight: 600;
  color: ${colors.darkGrey};
  margin: 0 0 5px 5px;
`;

export const Subtext = styled.div`
  color: ${colors.steel};
  margin: 5px 0 5px 5px;
`;

export const CheckboxItem = styled.div`
  display: inline-flex;
  width: 50%;
  padding: 5px;
  align-items: center;
  pointer-events: ${p => p.enableCheckbox ? 'none' : 'all'};
`;

export const CheckboxWrapper = styled.div`
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 10px;
  opacity: ${p => p.disableOnSelectAll ? 0.7 : 1};
`;
