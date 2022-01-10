// @flow
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background-color: ${p => p.theme.colors.alabaster};
  padding: 20px;
  color: ${p => p.theme.colors.brightBlue};
  font-size: 14px;
  margin: 5px 0;
  flex-direction: column;
  cursor: pointer;
  border-radius: 4px;
  > div {
    display: flex;
    flex-direction: row;
  }
  &.error {
    border: 1px solid ${p => p.theme.colors.coral};
    border-radius: 4px;
  }
`;

export const IconWrapper = styled.div`
  svg {
    width: 18px;
    height: 18px;
    fill: ${p => p.theme.colors.brightBlue};
    margin-right: 15px;
  }
`;
