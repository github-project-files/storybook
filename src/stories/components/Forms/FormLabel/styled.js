// @flow
/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Label = styled.label``;

export const Wrapper = styled.div`
  ${p =>
    p.inline
      ? 'display: inline-block;'
      : `display: ${p.isClear ? 'inline-flex': 'flex'};
      justify-content: space-between;`}
  color: ${colors.slateGrey};
  font-size: 14px;
  padding-bottom: 4px;
  padding-left: 6px;
`;
