// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { lighten } from 'polished';

export const Table = styled.table`
  width: 100%;
  border-spacing: 0px;

  td,
  th {
    padding: 12px;
  }
`;

export const TableBody = styled.tbody`
  td,
  th {
    font-size: 12px;
    text-align: right;
    word-break: break-word;
  }

  tr {
    height: 55px;
  }

  tr td:first-child,
  tr th:first-child,
  tr th:nth-child(2) {
    width: 6%;
    font-size: 14px;
    font-weight: bold;
    line-height: 0.86;
    text-align: left;
    color: ${colors.steel};
    border-right: 1px solid ${colors.paleGrey};
  }

  tr td:nth-child(2) {
    font-weight: bold;
    text-align: left;
  }
`;

export const ColumnHeader = styled.th`
  font-size: 12px;
  line-height: 1;
  color: ${colors.steel};
  border-bottom: 1px solid ${colors.paleGrey};
`;

export const TableCell = styled.td`
  cursor: ${p => (p.cursor ? p.cursor : 'auto')};
  min-width: 30px;
  position: relative;
  color: ${p => (p.green ? colors.shamrockGreen : colors.darkGrey)};
  border-bottom: 1px solid ${colors.paleGrey};
`;

export const Error = styled.span`
  color: ${colors.strawberry};
  font-size: 12px;
  margin-left: 10px;
`;

export const FileButton = styled.div`
  cursor: pointer;
  position: relative;
  min-width: 120px;
  margin-right: auto;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  height: 36px;
  padding: 6px 16px;
  border-radius: 30px;
  color: ${colors.white};
  border: 1px solid ${colors.transparent};
  background-color: ${colors.brightBlue};
  background-image: linear-gradient(251deg, #00aeff, #0076ff);
  @media (max-width: 999px) {
    margin-right: inherit;
  }
  &:hover {
    background-color: ${lighten(0.15, colors.brightBlue)};
  }

  input[type='file'] {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
    top: 0px;
    right: 0px;
  }

  svg {
    fill: ${colors.white};
  }
`;
