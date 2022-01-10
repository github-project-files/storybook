// @flow
import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border: 1px solid ${colors.paleGrey};
  border-radius: 8px;
  width: 100%;
  overflow: ${p => p.overflow === true ? 'visible' : 'hidden'};
`;

export default CardWrapper;
