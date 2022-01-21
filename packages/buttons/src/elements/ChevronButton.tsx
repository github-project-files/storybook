/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import IconButton, { IIconButtonProps } from './IconButton';

/**
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 */
const ChevronButton: React.FunctionComponent<
  IIconButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<HTMLButtonElement, IIconButtonProps>(({ ...buttonProps }, ref) => (
  <IconButton ref={ref} {...buttonProps}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
</svg>

  </IconButton>
));

ChevronButton.displayName = 'ChevronButton';

ChevronButton.propTypes = IconButton.propTypes;

ChevronButton.defaultProps = {
  isBasic: false,
  isPill: false,
  size: 'medium'
};

export default ChevronButton;