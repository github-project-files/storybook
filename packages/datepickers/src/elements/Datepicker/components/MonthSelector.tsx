/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback } from 'react';
import { StyledHeader, StyledHeaderPaddle, StyledHeaderLabel } from '../../../styled';
import useDatepickerContext from '../utils/useDatepickerContext';

interface IMonthSelectorProps {
  locale?: string;
  isCompact: boolean;
}

const MonthSelector: React.FunctionComponent<IMonthSelectorProps> = ({ locale, isCompact }) => {
  const { state, dispatch } = useDatepickerContext();

  const headerLabelFormatter = useCallback(
    date => {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric'
      });

      return formatter.format(date);
    },
    [locale]
  );

  return (
    <StyledHeader isCompact={isCompact}>
      <StyledHeaderPaddle
        isCompact={isCompact}
        onClick={() => {
          dispatch({
            type: 'PREVIEW_PREVIOUS_MONTH'
          });
        }}
        data-test-id="previous-month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M10.39 12.688a.5.5 0 01-.718.69l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L6.641 8l3.75 4.688z"/>
</svg>
      </StyledHeaderPaddle>
      <StyledHeaderLabel isCompact={isCompact} data-test-id="month-display">
        {headerLabelFormatter(state.previewDate)}
      </StyledHeaderLabel>
      <StyledHeaderPaddle
        isCompact={isCompact}
        onClick={() => {
          dispatch({
            type: 'PREVIEW_NEXT_MONTH'
          });
        }}
        data-test-id="next-month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M5.61 3.312a.5.5 0 01.718-.69l.062.066 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L9.359 8l-3.75-4.688z"/>
</svg>
      </StyledHeaderPaddle>
    </StyledHeader>
  );
};

export default MonthSelector;
