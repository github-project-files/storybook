// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 5px;
  padding: 20px;
  border: solid
    ${({ checked }) => (checked ? `2px ${colors.brightBlue}` : `1px ${colors.paleGrey}`)};
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
`;

export const OptionTitle = styled.div`
  font-weight: 600;
`;

export const Count = styled.span`
  margin: 0 5px;
  color: ${colors.steel};
`;

export const Title = styled.span`
  margin-left: 6px;
  font-weight: 600;
`;

export const OptionDescription = styled.div`
  color: ${colors.steel};
`;

export const Option = styled.div`
  margin-left: 10px;
`;

export const CheckboxWrapper = styled.div`
  width: 190px;
  display: flex;
  align-items: center;
  margin: 5px 10px;
`;

export const CheckboxLayoutWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
`;

export const Note = styled.span`
  color: ${colors.steel};
  font-weight: 400;
`;
