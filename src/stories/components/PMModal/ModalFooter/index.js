// @flow

import styled from 'styled-components';
import { colors, breakpoints } from 'utils/StyleGuide';

export default styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  border-top: 1px solid ${colors.paleGrey};

  @media (min-width: ${breakpoints.s}) {
    padding: 20px 20px 30px 20px;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
