// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background: ${colors.white};
  border-bottom: 1px solid #e5e5ea;
  height: 60px;
  width: 100%;
  padding: 0 20px;

  .menu-icon {
    @media (min-width: 1200px) {
      display: none;
    }
  }

  .prev-route-btn {
    display: inline-flex;
    border-style: solid;
    width: 10px;
    height: 10px;
    border-width: 2px 0px 0 2px;
    transform: rotate(-45deg);
    vertical-align: middle;
    margin-right: 8px;
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }

  label {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 24px;
    color: ${colors.darkGrey};
    flex: 1;

    @media (max-width: 320px) {
      font-size: 20px;
    }

    span.beta {
      display: inline-block;
      text-transform: uppercase;
      background-color: ${colors.slateGrey};
      color: ${colors.white};
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 700;
      margin: 0 8px;
      vertical-align: middle;
    }
  }

  span {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const NumberBadgeWrapper = styled.div`
  span {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const UserNameWrapper = styled.span`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
