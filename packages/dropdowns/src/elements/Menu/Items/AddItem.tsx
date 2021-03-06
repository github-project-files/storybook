/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Item, IItemProps } from './Item';
import { StyledAddItem, StyledItemIcon } from '../../../styled';
import useMenuContext from '../../../utils/useMenuContext';

// eslint-disable-next-line react/display-name
const AddItemComponent = React.forwardRef<HTMLLIElement, IItemProps>(
  ({ children, disabled, ...props }, ref) => {
    const { isCompact } = useMenuContext();

    return (
      <StyledAddItem ref={ref} disabled={disabled} {...props}>
        <StyledItemIcon isCompact={isCompact} isVisible isDisabled={disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.854.146a.5.5 0 01.057.638l-.057.07L9.707 4 12 6.293l3.146-3.147a.5.5 0 01.765.638l-.057.07L12.707 7l1.147 1.146a.5.5 0 01-.638.765l-.07-.057-.308-.309-.06.084-.07.078-3.058 3.057c-.87.87-2.256.91-3.172.119l-.128-.119-.704-.704-4.792 4.794a.5.5 0 01-.765-.638l.057-.07 4.793-4.793-.703-.703a2.334 2.334 0 01-.119-3.172l.119-.128 3.057-3.057a.959.959 0 01.162-.131l-.309-.308a.5.5 0 01.638-.765l.07.057L9 3.293 12.146.146a.5.5 0 01.708 0zM8.146 3.853L4.943 7.057a1.334 1.334 0 00-.097 1.778l.097.108 2.114 2.114a1.334 1.334 0 001.778.097l.108-.097 3.203-3.204-4-4z"/>
</svg>

        </StyledItemIcon>
        {children}
      </StyledAddItem>
    );
  }
);

/**
 * @extends LiHTMLAttributes<HTMLLIElement>
 */
export const AddItem = React.forwardRef<HTMLLIElement, Omit<IItemProps, 'component'>>(
  (props, ref) => <Item component={AddItemComponent} ref={ref} {...props} />
);

AddItem.displayName = 'AddItem';

AddItem.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool
};
