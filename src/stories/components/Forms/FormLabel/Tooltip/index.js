// @flow

import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import { TooltipPlaceholder, TooltipWrapper } from './styled';

/**
 * @param {string[] | string} messages
 * @return {Function}
 */
const getTooltipContent = (messages: string[] | string) => ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}) => {
  return (
    <TooltipWrapper>
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}
      >
        <div
          {...getArrowProps({
            ref: arrowRef,
            className: 'tooltip-arrow',
            'data-placement': placement,
          })}
        />
        {Array.isArray(messages) ? (
          <ul className="tooltip-body">
            {messages.map((message, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{message}</li>
            ))}
          </ul>
        ) : (
          <div className="tooltip-body tooltip-body__single-message">{messages}</div>
        )}
      </div>
    </TooltipWrapper>
  );
};

type TriggerProps = {
  getTriggerProps: Function,
  triggerRef: React$ElementRef<any>,
};

/**
 * @param {TriggerProps} props
 * @return {React$Node}
 */
const Trigger = ({ getTriggerProps, triggerRef }: TriggerProps) => {
  return (
    <span
      {...getTriggerProps({
        ref: triggerRef,
        className: 'trigger',
      })}
    >
      <TooltipPlaceholder />
    </span>
  );
};

/**
 * @param {string[] | string} messages
 * @return {React$Node}
 */
const Tooltip = ({ messages }: { messages: string[] | string }) => {
  return (
    <TooltipTrigger placement="right-start" trigger="hover" tooltip={getTooltipContent(messages)}>
      {Trigger}
    </TooltipTrigger>
  );
};

export default Tooltip;
