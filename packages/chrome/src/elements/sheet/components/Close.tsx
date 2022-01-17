/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, HTMLAttributes } from 'react';
import { StyledSheetClose } from '../../../styled';

export const SheetClose = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return (
      <StyledSheetClose aria-label="Close Sheet" ref={ref} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path stroke="currentColor" strokeLinecap="round" d="M3 13L13 3m0 10L3 3"/>
</svg>
      </StyledSheetClose>
    );
  }
);

SheetClose.displayName = 'Sheet.Close';
