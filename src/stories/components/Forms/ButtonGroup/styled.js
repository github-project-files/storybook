// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${p => (p.flex ? 'block' : 'inline-flex')};
`;
