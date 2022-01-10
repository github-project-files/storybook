// @flow
import styled from 'styled-components';
import priorityIcon from 'assets/triggerIcons/icon-priority.svg';
import nonePriorityIcon from 'assets/triggerIcons/icon-priority-none.svg';

export const PriorityIcon = styled(priorityIcon)`
  margin-right: 10px;
  width: 14px;
  fill: ${p => p.theme.priorityFlags[p.type]};
`;

export const NonePriorityIcon = styled(nonePriorityIcon)`
  margin-right: 10px;
  width: 14px;
`;

export const Wrapper = styled.div`
  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.paleGrey};
    :hover {
      background-color: ${p => p.theme.colors.alabaster};
    }
  }
  .react-select__control:focus-within svg {
    transform: scale(1);
  }

  @media (min-width: ${p => p.theme.breakpoints.m}) {
    width: 300px;
    .react-select__control {
      width: inherit;
    }
  }
`;

export const PrioityOption = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${p => p.theme.colors.charcoalGrey};
`;

