/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import useFileContext from '../../../utils/useFileContext';
import { StyledFileClose } from '../../../styled';

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const Close = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const fileContext = useFileContext();
    const onMouseDown = composeEventHandlers(
      props.onMouseDown,
      (event: MouseEvent) => event.preventDefault() // prevent parent File focus
    );

    return (
      <StyledFileClose ref={ref} {...props} onMouseDown={onMouseDown}>
        {fileContext && fileContext.isCompact ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12">
  <path stroke="currentColor" strokeLinecap="round" d="M3 9l6-6m0 6L3 3"/>
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path stroke="currentColor" strokeLinecap="round" d="M3 13L13 3m0 10L3 3"/>
</svg>}
      </StyledFileClose>
    );
  }
);

Close.displayName = 'File.Close';
