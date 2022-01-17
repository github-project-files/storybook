/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { IMediaInputProps, MediaInput } from '@zendeskgarden/react-forms';
import { FieldStory, IFieldArgs } from './FieldStory';

interface IArgs extends IMediaInputProps, IFieldArgs {}

export const MediaInputStory: Story<IArgs> = ({
  start,
  end,
  label,
  isLabelRegular,
  isLabelHidden,
  hasHint,
  hint,
  hasMessage,
  message,
  ...args
}) => (
  <FieldStory
    label={label}
    isLabelRegular={isLabelRegular}
    isLabelHidden={isLabelHidden}
    hasHint={hasHint}
    hint={hint}
    hasMessage={hasMessage}
    message={message}
    validation={args.validation}
  >
    <MediaInput {...args} start={start && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <circle cx="6" cy="6" r="5.5" fill="none" stroke="currentColor"/>
  <path stroke="currentColor" strokeLinecap="round" d="M15 15l-5-5"/>
</svg>} end={end && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <g fill="none" stroke="currentColor">
    <circle cx="8" cy="6.5" r="2"/>
    <path strokeLinejoin="round" d="M8 .5a5.9 5.9 0 00-6 5.83c0 2.17 1 3.3 2.19 4.89s2.64 3 3.8 4.28c1.17-1.31 2.62-2.76 3.81-4.28S14 8.5 14 6.33A6.19 6.19 0 008 .5z"/>
  </g>
</svg>} />
  </FieldStory>
);
