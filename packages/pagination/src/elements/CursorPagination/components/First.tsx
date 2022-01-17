/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { ButtonHTMLAttributes } from 'react';
import { StyledIcon, StyledCursor } from '../../../styled';

export const First = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...other }, ref) => {
    return (
      <StyledCursor ref={ref} {...other}>
        <StyledIcon type="first">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M7.812 13.39a.5.5 0 01-.64-.012l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L4.141 8l3.75 4.688a.5.5 0 01-.079.702zm5 0a.5.5 0 01-.64-.012l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L9.141 8l3.75 4.688a.5.5 0 01-.079.702z"/>
</svg>
        </StyledIcon>
        <span>{children}</span>
      </StyledCursor>
    );
  }
);

First.displayName = 'First';
