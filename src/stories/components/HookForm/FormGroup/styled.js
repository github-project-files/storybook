// @flow
import styled from 'styled-components';

const FormGroupElem = styled.div`
  margin-bottom: 20px;
  &.error {
    label {
      color: ${p => p.theme.colors.coral};
    }
    input,
    textarea {
      border-color: ${p => p.theme.colors.coral};
    }
    .react-select__control {
      border-color: ${p => p.theme.colors.coral};
    }
  }
`;

export default FormGroupElem;
