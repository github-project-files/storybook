/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import Icon from '@zendeskgarden/svg-icons/src/16/leaf-stroke.svg';
import { Button } from '@zendeskgarden/react-buttons';
import { IDropdownProps, IItemProps, IMenuProps, Trigger } from '@zendeskgarden/react-dropdowns';
import { ITEM } from './types';
import { DropdownStory } from './DropdownStory';

interface IArgs extends IMenuProps {
  hasMedia?: boolean;
  isDanger?: IItemProps['isDanger'];
  disabled?: IItemProps['disabled'];
  downshiftProps?: IDropdownProps['downshiftProps'];
  highlightedIndex?: IDropdownProps['highlightedIndex'];
  onStateChange: IDropdownProps['onStateChange'];
  isOpen?: IDropdownProps['isOpen'];
  selectedItems?: IDropdownProps['selectedItems'];
  items: ITEM[];
}

export const TriggerStory: Story<IArgs> = ({
  onSelect,
  downshiftProps,
  highlightedIndex,
  onStateChange,
  isOpen,
  selectedItems,
  items,
  disabled,
  isDanger,
  hasMedia,
  ...args
}) => (
  <DropdownStory
    isOpen={isOpen}
    onSelect={onSelect}
    onStateChange={onStateChange}
    downshiftProps={downshiftProps}
    highlightedIndex={highlightedIndex}
    selectedItems={selectedItems}
    colProps={{ textAlign: 'center' }}
    menuProps={args}
    items={items}
    itemProps={{ disabled, isDanger, hasIcon: hasMedia }}
  >
    <Trigger>
      <Button isDanger={isDanger} size={args.isCompact ? 'small' : undefined}>
        {hasMedia && (
          <Button.StartIcon>
            <Icon />
          </Button.StartIcon>
        )}
        Trigger
        <Button.EndIcon isRotated={isOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
</svg>
        </Button.EndIcon>
      </Button>
    </Trigger>
  </DropdownStory>
);
