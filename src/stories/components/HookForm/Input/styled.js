// @flow
import styled from 'styled-components';

const InputElem = styled.input`
  display: flex;
  flex: 1;
  border: 1px solid ${p => p.theme.colors.silver};
  outline: none;
  width: 100%;
  height: 40px;
  font-size: 14px;
  color: ${p => p.theme.colors.darkGrey};
  border-radius: 4px;
  padding: 10px;
  &:focus{
    border-color: ${p => p.theme.colors.brightBlue};
  }
`;

export default InputElem;