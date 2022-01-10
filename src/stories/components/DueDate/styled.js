// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const DueDateWrapper = styled.div`
  color: ${props => (props.pastDue ? colors.strawberry : colors.slateGrey)};
  font-weight: ${props => (props.pastDue ? 600 : 400)};

  svg {
    margin: 0 4px;
  }
`;

export const EmptyTableValue = styled.div`
  width: 58px;
  text-align: center;
`;

export const DueDateIcons = styled.span`
  @media (max-width: 875px) {
    display: none;
  }
`;
