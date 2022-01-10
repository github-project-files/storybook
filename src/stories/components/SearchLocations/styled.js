// @flow

import styled from 'styled-components';

export const SearchLocationsWrapper = styled.div`
  position: relative;
  width: inherit;
`;

export const SearchLocationsCover = styled.span`
  position: absolute;
  width: 100%;
  height: ${p => p.height}px;
`;

export const EmptyResults = styled.div`
  margin-top: 10px;
`;
