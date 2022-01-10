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

  .DateRangePickerInput_arrow_svg {
    margin: 0 5px;
  }

  .DateInput {
    width: 115px;
  }

  @media (min-width: 1000px) {
    .DateRangePicker {
      width: 100%;
      div:first-child {
      }
    }

    .DateRangePickerInput {
      width: 100%;
    }

    .DateInput {
      width: 250px;
    }
  }
`;
