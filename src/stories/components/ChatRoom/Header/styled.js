// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import backIcon from './img/backIcon.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${colors.paleGrey};
`;

export const Details = styled.div`
  padding-left: 14px;

  label {
    display: block;
  }

  label:first-child {
    font-size: 16px;
    font-weight: 600;
    color: ${colors.slateGrey};
  }

  label:last-child {
    font-size: 12px;
    color: ${colors.steel};
  }
`;

export const Options = styled.div`
  flex: 1;
  text-align: right;

  > div {
    cursor: pointer;
  }
`;

export const BackIcon = styled(backIcon)`
  width: 20px;
  height: 20px;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;
