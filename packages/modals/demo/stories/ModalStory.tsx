/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { EventHandler, MouseEventHandler } from 'react';
import { Story } from '@storybook/react';
import {
  Body,
  Close,
  Footer,
  FooterItem,
  Header,
  IModalProps,
  Modal
} from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
import { IFooterItem } from './types';

interface IArgs extends IModalProps {
  isVisible: boolean;
  onClick: MouseEventHandler<HTMLElement>;
  onClose: EventHandler<any>;
  hasBody: boolean;
  body: string;
  hasClose: boolean;
  hasFooter: boolean;
  footerItems: IFooterItem[];
  hasHeader: boolean;
  isDanger: boolean;
  header: string;
}

export const ModalStory: Story<IArgs> = ({
  onClick,
  onClose,
  isVisible,
  hasBody,
  body,
  hasClose,
  hasFooter,
  footerItems,
  hasHeader,
  header,
  isDanger,
  ...args
}) => (
  <>
    <Button size={args.isLarge ? 'large' : undefined} isDanger={isDanger} onClick={onClick}>
      Open
      <Button.EndIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" d="M12.17 7.5H9.5L12.96 1c.12-.28-.01-.5-.29-.5H7.5c-.28 0-.6.22-.71.5L4.21 7c-.11.28.01.5.29.5h2.45l-2.64 7.24c-.19.51-.04.95.59.38l7.29-6.87c.43-.4.4-.75-.02-.75z"/>
</svg>
      </Button.EndIcon>
    </Button>
    {isVisible && (
      <Modal {...args} onClose={onClose}>
        {hasHeader && <Header isDanger={isDanger}>{header}</Header>}
        {hasBody ? <Body>{body}</Body> : body}
        {hasFooter && (
          <Footer>
            {footerItems.map(({ text, type }, index) => (
              <FooterItem key={index}>
                <Button
                  isBasic={type === 'basic'}
                  isPrimary={type === 'primary'}
                  isDanger={isDanger && type === 'primary'}
                  onClick={onClose}
                >
                  {text}
                </Button>
              </FooterItem>
            ))}
          </Footer>
        )}
        {hasClose && <Close />}
      </Modal>
    )}
  </>
);
