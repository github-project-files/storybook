// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import arrowIcon from './img/arrowIcon.svg';

export const Wrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  margin-top: 0;
  padding: 20px;
  width: 100%;
  height: 60px;
  background: #fff;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.steel};
  border-bottom: 1px solid #ddd;
  z-index: 2;
`;

export const NavWrapper = styled.div`
  flex: 1;

  &:hover {
    span,
    svg {
      color: ${colors.brightBlue};
      fill: ${colors.brightBlue};
    }
  }
`;
export const TitleWrapper = styled.div`
  flex: 1;
  text-align: center;
  font-size: 15px;
`;
export const ButtonsWrapper = styled.div`
  flex: 1;
  text-align: right;

  svg {
    margin: 0 8px;
    height: 12px;
    width: 12px;
    cursor: pointer;
    fill: ${colors.steel};

    &:hover {
      path {
        fill: ${colors.brightBlue} !important;
      }
    }
  }
`;

export const BackButton = styled.div`
  cursor: pointer;

  span {
    line-height: 10px;
    font-size: 12px;
    margin-left: 5px;
    color: ${colors.steel};
    transition: 0.2s;
  }
`;

export const ArrowIcon = styled(arrowIcon)`
  height: 10px;
  width: 10px;
  fill: ${colors.steel};
  transition: fill 0.2s;
  transform: rotate(180deg);
`;
