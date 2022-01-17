/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar, IAvatarProps } from '@zendeskgarden/react-avatars';
import { TYPE } from './types';

interface IArgs extends IAvatarProps {
  type: TYPE;
}

export const AvatarStory: Story<IArgs> = ({ children, type, ...args }) => (
  <Avatar
    {...args}
    backgroundColor={args.backgroundColor || (type === 'image' ? undefined : PALETTE.kale[800])}
  >
    {
      {
        icon: args.isSystem ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" focusable="false" viewBox="0 0 26 26">
        <path fill="currentColor" d="M12 8.2v14.5H0zM12 3c0 3.3-2.7 6-6 6S0 6.3 0 3h12zm2 19.7c0-3.3 2.7-6 6-6s6 2.7 6 6H14zm0-5.2V3h12z"/>
      </svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
        <g fill="none" stroke="currentColor">
          <circle cx="8" cy="5" r="3.5"/>
          <path strokeLinecap="round" d="M2.5 15.5c.3-2.8 2.6-5 5.5-5s5.2 2.2 5.5 5"/>
        </g>
      </svg>,
        image: <img alt="" src={`images/avatars/${args.isSystem ? 'system' : 'user'}.png`} />,
        text: <Avatar.Text>{children || (args.isSystem ? 'ZD' : 'G')}</Avatar.Text>
      }[type]
    }
  </Avatar>
);
