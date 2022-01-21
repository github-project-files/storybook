/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { Chrome, Body, Header, HeaderItem, HeaderItemIcon } from '@zendeskgarden/react-chrome';
import { Avatar, IAvatarProps } from '@zendeskgarden/react-avatars';

export const ChromeStory: Story<IAvatarProps> = args => (
  <Chrome isFluid style={{ height: 'auto' }}>
    <Body>
      <Header>
        <HeaderItem aria-label="Products">
          <HeaderItemIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
            <path fill="currentColor" d="M1 1v5h5V1H1zm5 8a1 1 0 011 1v5a1 1 0 01-1 1H1a1 1 0 01-1-1v-5a1 1 0 011-1h5zm9 0a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5a1 1 0 011-1h5zm-9 1H1v5h5v-5zm9 0h-5v5h5v-5zM6 0a1 1 0 011 1v5a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h5zm9 0a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V1a1 1 0 011-1h5zm0 1h-5v5h5V1z"/>
          </svg>
          </HeaderItemIcon>
        </HeaderItem>
        <HeaderItem isRound aria-label="User profile">
          <Avatar {...args} size="extrasmall">
            <img alt="Example User" src="images/avatars/chrome.png" />
          </Avatar>
        </HeaderItem>
      </Header>
    </Body>
  </Chrome>
);