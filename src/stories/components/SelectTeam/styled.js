// @flow
import styled from 'styled-components';

export const SelectWrapper = styled.div`
  .react-select__control {
    min-height: 42px;
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    color: ${p => p.theme.colors.charcoalGrey};
  }
  .label {
    font-size: 14px;
    font-weight: 600;
  }
  .total-users {
    font-size: 12px;
  }
`;
