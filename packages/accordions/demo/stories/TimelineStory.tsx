/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { Span } from '@zendeskgarden/react-typography';
import { Timeline, ITimelineProps } from '@zendeskgarden/react-accordions';
import { ITimelineItem } from './types';

interface IArgs extends ITimelineProps {
  hasIcon: boolean;
  hasOppositeContent: boolean;
  items: ITimelineItem[];
  surfaceColor: string;
}

export const TimelineStory: Story<IArgs> = ({ items, ...args }) => (
  <div style={{ backgroundColor: args.surfaceColor }}>
    <Timeline {...args}>
      {items.map((item, index) => (
        <Timeline.Item key={index} icon={args.hasIcon && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12">
        <g fill="none" stroke="currentColor">
          <circle cx="6" cy="6" r="5.5"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 3v3.5H8"/>
        </g>
      </svg>} surfaceColor={args.surfaceColor}>
          {args.hasOppositeContent && (
            <Timeline.OppositeContent>
              <Span hue="grey">{item.description}</Span>
            </Timeline.OppositeContent>
          )}
          <Timeline.Content>
            <Span isBold tag="div">
              {item.title}
            </Span>
            {!args.hasOppositeContent && <Span hue="grey">{item.description}</Span>}
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);
