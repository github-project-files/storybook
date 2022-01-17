/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { StyledNotification, StyledIcon } from '../styled';
import { ARRAY_VALIDATION_TYPE, VALIDATION_TYPE } from '../utils/types';
import { validationIcons, validationHues } from '../utils/icons';

export interface INotificationProps extends HTMLAttributes<HTMLDivElement> {
  type?: VALIDATION_TYPE;
}

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const Notification = React.forwardRef<HTMLDivElement, INotificationProps>((props, ref) => {
  const Icon = props.type ? validationIcons[props.type] : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <g stroke="currentColor">
    <circle cx="7.5" cy="8.5" r="7" fill="none"/>
    <path strokeLinecap="round" d="M7.5 12.5V8"/>
  </g>
  <circle cx="7.5" cy="5" r="1" fill="currentColor"/>
</svg>;
  const hue = props.type && validationHues[props.type];

  return (
    <StyledNotification ref={ref} type={props.type} isFloating {...props}>
      {props.type && (
        <StyledIcon hue={hue}>
          <Icon />
        </StyledIcon>
      )}

      {props.children}
    </StyledNotification>
  );
});

Notification.displayName = 'Notification';

Notification.propTypes = {
  type: PropTypes.oneOf(ARRAY_VALIDATION_TYPE)
};
