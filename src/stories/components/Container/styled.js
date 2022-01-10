// @flow
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: ${p => (p.dir ? 'row' : p.dir)};

  @media (min-width: ${p => p.theme.breakpoints.s}) {
    max-width: 560px;
  }

  @media (min-width: ${p => p.theme.breakpoints.m}) {
    max-width: 860px;
  }

  @media (min-width: ${p => p.theme.breakpoints.l}) {
    max-width: 80%;
  }
`;

export default Container;
