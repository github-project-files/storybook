// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  position: relative;
  width: ${props => (props.width ? props.width : '100%')};
  border: none;
  padding-top: 0;
  padding-bottom: 20px;
  padding-left: 0;
  padding-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  input[readonly] {
    background: ${colors.alabaster};
  }
`;

export const ClearField = styled.span`
  color: ${colors.slateGrey};
  font-size: 14px;
  float: right;
  cursor: pointer;
  &:hover {
    color: ${colors.brightBlue};
  }
`;

export const AsteriskEl = styled.span`
  color: ${colors.coral};
  margin-left: 3px;
`;