// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const SearchUsersWrapper = styled.div`
  position: relative;
  width: inherit;
`;

export const CheckBoxWrapper = styled.div`
  margin-top: 10px;
  margin-left: 5px;
  border-bottom: 1px solid ${colors.paleGrey};
  padding-bottom: 10px;
  display: inline-flex;
`;

export const SearchUsersCover = styled.span`
  position: absolute;
  width: 100%;
  height: ${p => p.height}px;
`;

export const EmptyResults = styled.div`
  margin-top: 10px;
`;
