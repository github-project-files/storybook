// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { Text, View, Image } from '@react-pdf/renderer';

export const ViewWrapper = styled(View)`
  display: flex;
  align-items: ${p => (p.align ? p.align : 'baseline')};
  justify-content: ${p => (p.split ? 'space-between' : 'flex-start')};
`;

export const ViewItem = styled(View)`
  display: flex;
  flex-flow: column;
  &.total-costs-summary {
    width: 400px;
    padding: 20px;
    background: ${colors.lightGrey};
    margin-top: 20px;
  }
`;

export const InvoiceHeading = styled(Text)`
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const InvoiceNumber = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.coral};
`;

export const InfoItemWrapper = styled(View)`
  display: flex;
  flex-flow: ${p => (p.flow === 'column' ? 'column' : 'row')};
`;

export const SectionHeading = styled(Text)`
  font-size: 16px;
  font-weight: 700;
`;

export const KeyText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
`;

export const ValueText = styled(Text)`
  font-size: 14px;
`;

export const SectionDivider = styled(View)`
  display: block;
  border-bottom: 1px solid ${colors.charcoalGrey};
  margin: 10px 0;
`;

export const CompanyLogo = styled(Image)`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${colors.paleGrey};
  margin-right: 30px;
  background-image: url('${p => (p.source ? p.source : ``)}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

export const TableData = styled(Text)`
  display: table-cell;
  padding: 10px 0;
  font-weight: 600;
  text-align: ${p => (p.align ? p.align : 'left')};
`;

export const TableHeader = styled(View)`
  display: table-row;
`;

export const TableHeading = styled(Text)`
  display: table-cell;
  padding: 10px;
  font-weight: 700;
  background: ${colors.coral};
  color: #fff;
  border-right: 5px solid #fff;
`;

export const TableBody = styled(View)`
  display: table-row-group;
`;

export const TableRow = styled(View)`
  display: table-row;
  ${TableData} {
    border-bottom: ${p => (p.border ? `1px solid ${colors.charcoalGrey} !important` : 'none')};
  }
`;

export const Table = styled(View)`
  display: table;
  width: 100%;
  &.total-costs-summary {
    width: 400px;
    padding: 20px;
  }
  margin-top: 10px;
  ${TableData} {
    border-bottom: ${p => (p.withSeparator ? `2px solid ${colors.paleGrey}` : 'none')};
  }
  &.total-costs ${TableRow} {
    > ${TableData}:first-of-type {
      width: 220px;
      font-weight: bold;
    }
  }
`;

export const SignatureImage = styled(Image)`
  height: 50px;
  width: 150px;
  background-image: url('${p => (p.source ? p.source : ``)}');
  background-repeat: no-repeat;
  background-size: contain;
`;
