// @flow
import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const LegendItem = styled.div`
  display: flex;
  margin: 6px 4px;
  align-items: center;
  > span {
    margin-right: 5px;
  }
`;

export const Marker = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  background-color: ${p => p.bgColor};
`;
export const Label = styled.span`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Value = styled.span`
  margin-left: 15px;
  color: ${colors.steel};
  font-size: 14px;
`;
