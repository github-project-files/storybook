// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import clipboardIcon from './img/clipboardIcon.svg';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 0 auto;
  background-color: ${colors.alabaster};
  transition: 200ms border-top;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  border: solid 1px ${colors.paleGrey};
`;

export const HeaderRow = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  color: ${colors.black};
`;

export const SubTitle = styled.div`
  span {
    color: ${colors.strawberry};
    cursor: pointer;
  }

  div {
    text-align: center;
  }
`;

export const ClipboardIcon = styled(clipboardIcon)`
  fill: none;
  stroke: ${colors.black};
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;
