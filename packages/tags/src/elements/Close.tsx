/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import { StyledClose } from '../styled';


/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
const Close = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <StyledClose ref={ref} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path stroke="currentColor" strokeLinecap="round" d="M3 13L13 3m0 10L3 3"/>
</svg>
  </StyledClose>
));

Close.displayName = 'Close';

export default Close;
