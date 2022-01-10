// @flow

import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;