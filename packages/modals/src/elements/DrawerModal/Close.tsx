/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StyledDrawerModalClose } from '../../styled';
import { useModalContext } from '../../utils/useModalContext';

/**
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
export const Close = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { getCloseProps } = useModalContext();

  return (
    <StyledDrawerModalClose ref={ref} {...getCloseProps(props)}>
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path stroke="currentColor" strokeLinecap="round" d="M3 13L13 3m0 10L3 3"/>
</svg>
    </StyledDrawerModalClose>
  );
});

Close.displayName = 'DrawerModal.Close';
