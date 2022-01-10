// @flow
import styled from 'styled-components';

const Wrapper = styled.div`
 @media (min-width: ${p => p.theme.breakpoints.m}) {
    width: 280px;
    .react-select__control {
      width: inherit;
    }
  }
`;

export default Wrapper;