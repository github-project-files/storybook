// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const RowWrapper = styled.div`
  background-color: ${props => props.background};
  border-bottom: 1px solid ${colors.paleGrey};
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease;
  overflow: visible !important;
  cursor: pointer;
  transform: ${props => props.active && 'translate(1px, 1px)'};
  box-shadow: ${props => props.active && '0 2px 10px rgba(0, 0, 0, 0.2)'};
  border-radius: ${props => props.active && '6px'};
  z-index: ${props => props.active && '999'};

  &:hover {
    transform: translate(1px, 1px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    z-index: 999;
  }

  .wo-title {
    font-weight: 600;
    color: ${props => (props.status === 'COMPLETE' ? colors.steel : colors.darkGrey)};
  }
`;
