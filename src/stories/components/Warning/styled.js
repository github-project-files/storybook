// @flow

import styled from 'styled-components';
import AlertIcon from './img/icon-alert.svg';

export const Alert = styled(AlertIcon)`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

export const WarningMessage = styled.div`
  padding: 10px 18px;
  background-color: rgba(224, 170, 8, 0.05);
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
