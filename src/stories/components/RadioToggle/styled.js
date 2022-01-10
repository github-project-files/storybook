// @flow
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  > div {
    position: relative;
  }
`;

export const Label = styled.div`
  display: flex;
  margin-left: 8px;
  flex: 1;
`;

export const Check = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border: 1px solid ${p => p.theme.colors.silver};
  border-radius: 50%;
  top: 0;
  margin-right: 5px;
  &.checked {
    border-color: ${p => p.theme.colors.brightBlue};
    &:after {
    content: ' ';
    background-color: ${p => p.theme.colors.brightBlue};
    position: absolute;
    width: 12px;
    height: 12px;
    display: flex;
    top: 2px;
    left: 2px;
    position: relative;
    border-radius: 50%;
  }
  }
`;
