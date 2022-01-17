/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { SelectHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { StyledSelect, StyledSelectWrapper } from '../styled';
import { FauxInput } from './FauxInput';
import useFieldContext from '../utils/useFieldContext';
import { VALIDATION } from '../utils/validation';

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Applies compact styling */
  isCompact?: boolean;
  /** Removes borders and padding */
  isBare?: boolean;
  /** Applies inset `box-shadow` styling on focus */
  focusInset?: boolean;
  /** Applies validation state styling */
  validation?: VALIDATION;
}

/**
 * @extends SelectHTMLAttributes<HTMLSelectElement>
 */
export const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ disabled, isCompact, ...props }, ref) => {
    const fieldContext = useFieldContext();

    let combinedProps = {
      disabled,
      isCompact,
      ref,
      ...props
    };

    if (fieldContext) {
      combinedProps = fieldContext.getInputProps(combinedProps, { isDescribed: true });
    }

    return (
      <StyledSelectWrapper isCompact={isCompact}>
        <StyledSelect {...(combinedProps as any)} />
        {!props.isBare && (
          <FauxInput.EndIcon isDisabled={disabled}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
</svg>
          </FauxInput.EndIcon>
        )}
      </StyledSelectWrapper>
    );
  }
);

Select.propTypes = {
  isCompact: PropTypes.bool,
  isBare: PropTypes.bool,
  focusInset: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'warning', 'error'])
};

Select.displayName = 'Select';
