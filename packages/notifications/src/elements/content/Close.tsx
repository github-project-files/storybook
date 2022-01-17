/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { ButtonHTMLAttributes } from 'react';
import { StyledClose } from '../../styled';
import { useNotificationsContext } from '../../utils/useNotificationsContext';

/**
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
export const Close = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    const hue = useNotificationsContext();

    return (
      <StyledClose ref={ref} hue={hue} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12">
  <path stroke="currentColor" strokeLinecap="round" d="M3 9l6-6m0 6L3 3"/>
</svg>
      </StyledClose>
    );
  }
);

Close.displayName = 'Close';
