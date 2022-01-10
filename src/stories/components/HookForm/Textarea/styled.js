// @flow
import styled from 'styled-components';

const Textarea = styled.textarea`
  display: flex;
  flex: 1;
  border: 1px solid ${p => p.theme.colors.silver};
  outline: none;
  width: 100%;
  font-size: 14px;
  color: ${p => p.theme.colors.darkGrey};
  border-radius: 4px;
  padding: 10px;
  resize: none;
  &:focus {
    border-color: ${p => p.theme.colors.brightBlue};
  }
`;

export default Textarea;