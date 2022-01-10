// @flow

import styled from 'styled-components';
import filesIcon from 'assets/commonIcons/filesIcon.svg';
import closeIcon from 'assets/commonIcons/closeIcon.svg';
import deleteIcon from 'assets/commonIcons/deleteIcon.svg';
import { colors } from 'utils/StyleGuide';

export const TitleWrapper = styled.div`
  display: flex;
  padding: 12px;
`;

export const SubTitle = styled.div`
  flex: 1;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: normal;
  color: ${colors.slateGrey};

  span {
    color: ${colors.strawberry};
    cursor: pointer;
  }

  div {
    text-align: center;
  }
`;

export const Title = styled.div`
  font-size: 14px;
`;

export const Count = styled.span`
  color: ${colors.brightBlue};
  font-weight: 600;
`;

export const TotalCost = styled.span`
  color: ${colors.shamrockGreen};
  font-weight: 600;
`;

export const FilesIcon = styled(filesIcon)`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const TableWrapper = styled.div`
  overflow: hidden;
`;

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
  cursor: pointer;
`;

export const TableInput = styled.input`
  width: 100%;
  margin: 0px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${colors.paleGrey};
  border: none;
  outline: none;
  text-align: right;
  font-size: 12px;

  &:focus {
    border: solid 1px ${colors.dodgerBlue};
  }
`;

export const Close = styled(closeIcon)`
  position: absolute;
  z-index: 1;
  right: 32px;
  bottom: -12px;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 12px;
  background-color: ${colors.alabaster};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  fill: ${colors.silver};
  cursor: pointer;

  &:hover {
    fill: #fff;
    background-image: linear-gradient(223deg, ${colors.coral}, ${colors.lipstick});
  }
`;

export const DeleteIcon = styled(deleteIcon)`
  cursor: pointer;
  fill: ${colors.charcoalGrey};

  &:hover {
    fill: ${colors.strawberry};
  }
`;

export const Checkmark = styled.div`
  position: absolute;
  z-index: 1;
  right: 4px;
  bottom: -12px;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 12px;
  background-image: linear-gradient(223deg, #00aeff, #0076ff);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    width: 6px;
    height: 14px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-left: 4px;
    margin-top: -1px;
  }
`;

export const AddButton = styled.div`
  cursor: pointer;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.brightBlue};
  background: none;
  border: none;
  outline: none;
  padding: 15px;
  text-align: center;
`;

export const LoaderWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
`;
