/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, HTMLAttributes } from 'react';
import { StyledTimelineContent, StyledSeparator, StyledItemIcon } from '../../../styled';
import { useTimelineItemContext } from '../../../utils';

export const Content = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { icon, surfaceColor } = useTimelineItemContext();

  return (
    <>
      <StyledSeparator>
        <StyledItemIcon surfaceColor={surfaceColor}>{icon || <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12">
        <g fill="none" stroke="currentColor">
          <circle cx="6" cy="6" r="5.5"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 3v3.5H8"/>
        </g>
      </svg>}</StyledItemIcon>
      </StyledSeparator>
      <StyledTimelineContent ref={ref} {...props} />
    </>
  );
});

Content.displayName = 'Content';
