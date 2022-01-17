/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, {
  useState,
  useRef,
  useEffect,
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  HTMLAttributes
} from 'react';
import PropTypes from 'prop-types';
import { Modifier } from 'react-popper';
import { Button } from '@zendeskgarden/react-buttons';
import { GARDEN_PLACEMENT } from '@zendeskgarden/react-modals';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import { Colorpicker, IColorpickerProps } from '../Colorpicker';
import { IColor } from '../../utils/types';
import {
  StyledButton,
  StyledButtonPreview,
  StyledTooltipModal,
  StyledTooltipBody
} from '../../styled';

interface IDialogChanges {
  isOpen?: boolean;
}

export interface IColorpickerDialogProps extends IColorpickerProps {
  /**
   * Handles close actions. Can be triggered from the backdrop.
   *
   * @param {Object} color A color picker state
   */
  onClose?: (color: IColor) => void;
  /** Adjusts the placement of the color dialog */
  placement?: GARDEN_PLACEMENT;
  /** Disables the color dialog button */
  disabled?: boolean;
  /**
   * Modifies [Popper instance](https://popper.js.org/docs/v2/modifiers/) to customize positioning logic
   */
  popperModifiers?: Partial<Modifier<any, any>>[];
  /**
   * Sets the `z-index` of the color dialog
   */
  zIndex?: number;
  /**
   * Adds an arrow to the color dialog
   */
  hasArrow?: boolean;
  /**
   * Animates the color dialog
   */
  isAnimated?: boolean;
  /**
   * Opens the dialog in a controlled color picker dialog
   */
  isOpen?: boolean;
  /**
   * Applies inset `box-shadow` styling on focus
   */
  focusInset?: boolean;
  /**
   * Passes HTML attributes to the color dialog button element
   */
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  /**
   * Handles dialog changes
   *
   * @param {Object} changes The changed dialog state
   */
  onDialogChange?: (changes: IDialogChanges) => void;
}

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const ColorpickerDialog = forwardRef<
  HTMLDivElement,
  IColorpickerDialogProps & Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onChange'>
>(
  (
    {
      color,
      defaultColor,
      placement,
      onChange,
      onClose,
      labels,
      hasArrow,
      isAnimated,
      isOpaque,
      isOpen,
      popperModifiers,
      zIndex,
      focusInset,
      disabled,
      buttonProps,
      onDialogChange,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = color !== null && color !== undefined;
    const isDialogControlled = isOpen !== undefined && isOpen !== null;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
    const [uncontrolledColor, setUncontrolledColor] = useState<string | IColor | undefined>(
      defaultColor
    );

    const openDialog = () => {
      setReferenceElement(buttonRef.current);
      onDialogChange && onDialogChange({ isOpen: true });
    };

    const closeDialog = () => {
      setReferenceElement(null);
      onDialogChange && onDialogChange({ isOpen: false });
    };

    const onClick = composeEventHandlers(props.onClick, () => {
      if (referenceElement) {
        closeDialog();
      } else {
        openDialog();
      }
    });

    useEffect(() => {
      if (isDialogControlled) {
        if (isOpen) {
          setReferenceElement(buttonRef.current);
        } else {
          setReferenceElement(null);
        }
      }
    }, [isOpen, isDialogControlled]);

    return (
      <>
        {children ? (
          cloneElement(Children.only(children as ReactElement), {
            onClick,
            ref: buttonRef
          })
        ) : (
          <StyledButton
            disabled={disabled}
            focusInset={focusInset}
            ref={buttonRef}
            onClick={onClick}
            {...buttonProps}
          >
            <StyledButtonPreview backgroundColor={isControlled ? color : uncontrolledColor} />
            {/* eslint-disable-next-line no-eq-null, eqeqeq */}
            <Button.EndIcon isRotated={referenceElement != null}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
</svg>
            </Button.EndIcon>
          </StyledButton>
        )}
        <StyledTooltipModal
          ref={ref}
          hasArrow={hasArrow}
          popperModifiers={popperModifiers}
          zIndex={zIndex}
          isAnimated={isAnimated}
          isOpaque={isOpaque}
          focusOnMount={false}
          placement={placement}
          referenceElement={referenceElement}
          onClose={() => {
            closeDialog();
            onClose && onClose(isControlled ? (color as IColor) : (uncontrolledColor as IColor));
          }}
          {...props}
        >
          <StyledTooltipBody>
            <Colorpicker
              autofocus
              color={color}
              isOpaque={isOpaque}
              labels={labels}
              ref={colorPickerRef}
              defaultColor={uncontrolledColor}
              onChange={isControlled ? onChange : setUncontrolledColor}
            />
          </StyledTooltipBody>
        </StyledTooltipModal>
      </>
    );
  }
);

ColorpickerDialog.propTypes = {
  placement: PropTypes.oneOf([
    'auto',
    'top',
    'top-start',
    'top-end',
    'end',
    'end-top',
    'end-bottom',
    'bottom',
    'bottom-start',
    'bottom-end',
    'start',
    'start-top',
    'start-bottom'
  ]),
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onDialogChange: PropTypes.func,
  disabled: PropTypes.bool,
  labels: PropTypes.object,
  color: PropTypes.oneOfType<any>([PropTypes.object, PropTypes.string]),
  defaultColor: PropTypes.oneOfType<any>([PropTypes.object, PropTypes.string]),
  buttonProps: PropTypes.object
};

ColorpickerDialog.defaultProps = {
  placement: 'bottom-start',
  isAnimated: true,
  zIndex: 1000,
  hasArrow: false /* TooltipModal override */
};

ColorpickerDialog.displayName = 'ColorpickerDialog';
