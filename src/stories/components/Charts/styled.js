// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const ChartWrapper = styled.div`
  width: calc(100% - 20px);
  height: ${p => (p.height ? p.height : '400px')};
  .xAxis {
    line {
      display: none;
    }
  }

  .yAxis tspan {
    color: ${colors.lightGrey};
    font-size: 13px;
  }
  .recharts-legend-wrapper {
    max-height: 360px;
    overflow-y: auto;
  }
  .xAxis;
`;

export const ValuePercent = styled.div`
  &:after {
    content: '%';
    display: inline-flex;
  }
`;
