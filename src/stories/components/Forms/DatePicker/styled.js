// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';
import { inputStyle } from '../FormStyles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .DateInput_input {
    ${inputStyle}
    padding-left: ${p => p.customInputIcon && '42px'};
    border: 1px solid ${colors.silver};
  }

  .DateInput__disabled, 
  .SingleDatePickerInput__disabled,
  .DateInput_input__disabled {
    font-style: normal;
    background: none;

    button {
      opacity: 0.3;
    }
  }

  .DateInput_1 {
    width: 100%;
  }

  .SingleDatePicker, .SingleDatePickerInput {
    width: 100%;

    .SingleDatePickerInput_calendarIcon {
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 10px;
      margin: 8px 0;
      border-right: 1px solid ${colors.silver};

      &:focus {
        outline: none;
      }
    }
  }
`;
