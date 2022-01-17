/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import useFileContext from '../../../utils/useFileContext';
import { StyledFileDelete } from '../../../styled';

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const Delete = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const fileContext = useFileContext();
    const onMouseDown = composeEventHandlers(
      props.onMouseDown,
      (event: MouseEvent) => event.preventDefault() // prevent parent File focus
    );

    return (
      <StyledFileDelete ref={ref} {...props} onMouseDown={onMouseDown}>
        {fileContext && fileContext.isCompact ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M4.5 2.5V1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1.5M2 2.5h8m-5.5 7V5m3 4.5V5m-5-.5V11c0 .3.2.5.5.5h6c.3 0 .5-.2.5-.5V4.5"/>
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M6.5 2.5V1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1.5M3 2.5h10m-6.5 11v-8m3 8v-8m-6-1V15c0 .3.2.5.5.5h8c.3 0 .5-.2.5-.5V4.5"/>
</svg>}
      </StyledFileDelete>
    );
  }
);

Delete.displayName = 'File.Delete';
