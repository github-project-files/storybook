/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { MouseEventHandler } from 'react';
import { Story } from '@storybook/react';
import { Accordion, IAccordionProps } from '@zendeskgarden/react-accordions';
import { IconButton } from '@zendeskgarden/react-buttons';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { IAccordionSection } from './types';

interface IProps {
  isCompact: boolean;
}

const handleClick: MouseEventHandler<HTMLButtonElement> = event => event.preventDefault();

const IconButtons = ({ isCompact }: IProps) => (
  <>
    <Tooltip content="Settings">
      <IconButton
        focusInset={isCompact}
        size={isCompact ? 'small' : 'medium'}
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
          <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
        </svg>
    </IconButton>
    </Tooltip>
    <Tooltip content="Folders">
      <IconButton
        focusInset={isCompact}
        size={isCompact ? 'small' : 'medium'}
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
        <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
        </svg>
      </IconButton>
    </Tooltip>
  </>
);

interface IArgs extends IAccordionProps {
  hasIconButtons: boolean;
  sections: IAccordionSection[];
}

export const AccordionStory: Story<IArgs> = ({ sections, ...args }: IArgs) => (
  <Accordion {...args}>
    {sections.map((section, index) => (
      <Accordion.Section key={index}>
        <Accordion.Header>
          <Accordion.Label>{section.headerLabel}</Accordion.Label>
          {args.hasIconButtons && <IconButtons isCompact={args.isCompact || false} />}
        </Accordion.Header>
        <Accordion.Panel>{section.panel}</Accordion.Panel>
      </Accordion.Section>
    ))}
  </Accordion>
);
