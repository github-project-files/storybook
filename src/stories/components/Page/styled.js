// @flow

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  overflow-y: ${p => (p.disableScroll ? 'auto' : 'auto')};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${p => (p.centered ? 'center' : 'flex-start')};

  padding: ${p => (p.withMargin ? '10px' : 0)};

  @media (min-width: 1200px) {
    padding: ${p => (p.withMargin ? '30px' : 0)};
    padding-top: ${p => (p.withMargin ? '16px' : 0)};
  }
`;
