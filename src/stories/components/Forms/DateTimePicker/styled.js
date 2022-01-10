// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { inputStyle } from '../FormStyles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .DateInput_input {
    ${inputStyle}
  }

  .DateInput_1 {
    width: 100%;
  }

  .SingleDatePicker,
  .SingleDatePickerInput {
    width: 100%;
  }

  .rw-widget-container {
    border-color: #e5e5ea;

    input {
      pointer-events: none;
    }
  }

  .rw-widget-input {
    box-shadow: none;
    font-size: 14px;
  }
`;
