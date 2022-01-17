/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, FocusEvent, forwardRef, HTMLAttributes, useMemo } from 'react';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';
// import ChevronDown from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';
import { useAccordionContext, useSectionContext, HeaderContext } from '../../../utils';
import { StyledHeader, StyledRotateIcon, COMPONENT_ID as buttonGardenId } from '../../../styled';

export const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const {
    level: ariaLevel,
    isCompact,
    isCollapsible,
    getHeaderProps,
    getTriggerProps,
    expandedSections
  } = useAccordionContext();
  const { onClick, onFocus, onBlur, onMouseOver, onMouseOut, children, ...other } = props;
  const sectionIndex = useSectionContext();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = expandedSections.includes(sectionIndex);
  /**
   *  Pressing the space key on a button triggers the `onTriggerClick` callback.
   * `onKeyDown` is plucked out and not passed to the Label (button) element
   * to prevent double invocations of the click event.
   */
  const {
    onClick: onTriggerClick,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onKeyDown,
    ...otherTriggerProps
  } = getTriggerProps({
    type: 'button',
    index: sectionIndex
  });
  const onHeaderFocus = (e: FocusEvent) => {
    e.persist();

    setTimeout(() => {
      const isAccordionButton = e.target.getAttribute('data-garden-id') === buttonGardenId;
      const isFocusVisible = e.target.getAttribute('data-garden-focus-visible');

      if (isAccordionButton && isFocusVisible) {
        setIsFocused(true);
      }
    }, 0);
  };

  const value = useMemo(
    () => ({
      isHovered,
      otherTriggerProps
    }),
    [isHovered, otherTriggerProps]
  );

  return (
    <HeaderContext.Provider value={value}>
      <StyledHeader
        {...getHeaderProps({
          ref,
          ariaLevel,
          isCompact,
          isFocused,
          isExpanded,
          isCollapsible,
          onClick: composeEventHandlers(onClick, onTriggerClick),
          onFocus: composeEventHandlers(onFocus, onHeaderFocus),
          onBlur: composeEventHandlers(onBlur, () => setIsFocused(false)),
          onMouseOver: composeEventHandlers(onMouseOver, () => setIsHovered(true)),
          onMouseOut: composeEventHandlers(onMouseOut, () => setIsHovered(false)),
          ...other
        })}
      >
        {children}
        <StyledRotateIcon
          isCompact={isCompact}
          isHovered={isHovered}
          isRotated={isExpanded}
          isCollapsible={isCollapsible}
          onMouseOver={composeEventHandlers(onMouseOver, () => setIsHovered(true))}
          onMouseOut={composeEventHandlers(onMouseOut, () => setIsHovered(false))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
</svg>
        </StyledRotateIcon>
      </StyledHeader>
    </HeaderContext.Provider>
  );
});

Header.displayName = 'Header';
