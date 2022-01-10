// @flow

import styled from 'styled-components';
import { colors } from 'utils/StyleGuide';

export const Wrapper = styled.div`
  display: inline-flex;
`;

export const TooltipWrapper = styled.div`
  display: ${p => (JSON.parse(p.display) ? 'block' : 'none')};

  .__react_component_tooltip {
    font-size: 12px;
    padding: 8px;
    background-color: ${colors.darkGrey};
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5);
  }

  aside {
    display: block;
    height: 10px;
  }

  i {
    display: block;
    font-size: 10px;
    color: ${colors.silver};
  }
`;

TooltipWrapper.defaultProps = {
  display: 'true',
};
