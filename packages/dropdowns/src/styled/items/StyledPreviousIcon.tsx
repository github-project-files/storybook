/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';
import { PreviousIconSvg } from './chevron-left';

const COMPONENT_ID = 'dropdowns.previous_item_icon';

interface IStyledPreviousIconProps {
  isDisabled?: boolean;
}

const PreviousIconComponent: React.FC<HTMLAttributes<SVGSVGElement>> = ({ className }) => (
  <PreviousIconSvg
    data-garden-id={COMPONENT_ID}
    data-garden-version={PACKAGE_VERSION}
    className={className}
  />
);

export const StyledPreviousIcon = styled(PreviousIconComponent)<IStyledPreviousIconProps>`
  transform: ${props => props.theme.rtl && 'rotate(180deg)'};
  color: ${props => (props.isDisabled ? 'inherit' : getColor('neutralHue', 600, props.theme))};

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledPreviousIcon.defaultProps = {
  theme: DEFAULT_THEME
};
