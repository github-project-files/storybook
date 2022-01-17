/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { EventHandler, MouseEventHandler } from 'react';
import { Story } from '@storybook/react';
import { useTheme } from 'styled-components';
import { DrawerModal, IDrawerModalProps } from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
import { IFooterItem } from './types';

interface IArgs extends IDrawerModalProps {
  onClick: MouseEventHandler<HTMLElement>;
  onClose: EventHandler<any>;
  hasBody: boolean;
  body: string;
  hasClose: boolean;
  hasFooter: boolean;
  footerItems: IFooterItem[];
  hasHeader: boolean;
  header: string;
}

export const DrawerModalStory: Story<IArgs> = ({
  onClick,
  onClose,
  hasBody,
  body,
  hasClose,
  hasFooter,
  footerItems,
  hasHeader,
  header,
  ...args
}) => {
  const theme = useTheme();

  return (
    <>
      <Button onClick={onClick}>
        Open
        <Button.EndIcon isRotated={theme.rtl}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M1 8.5h14.5m-10-5L.9 8.1c-.2.2-.2.5 0 .7l4.6 4.6"/>
</svg>
        </Button.EndIcon>
      </Button>
      <DrawerModal {...args} onClose={onClose}>
        {hasHeader && <DrawerModal.Header>{header}</DrawerModal.Header>}
        {hasBody ? <DrawerModal.Body>{body}</DrawerModal.Body> : body}
        {hasFooter && (
          <DrawerModal.Footer>
            {footerItems.map(({ text, type }, index) => (
              <DrawerModal.FooterItem key={index}>
                <Button isBasic={type === 'basic'} isPrimary={type === 'primary'} onClick={onClose}>
                  {text}
                </Button>
              </DrawerModal.FooterItem>
            ))}
          </DrawerModal.Footer>
        )}
        {hasClose && <DrawerModal.Close />}
      </DrawerModal>
    </>
  );
};
