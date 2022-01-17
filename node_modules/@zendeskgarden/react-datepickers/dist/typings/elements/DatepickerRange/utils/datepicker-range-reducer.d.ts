/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
import { IDatepickerRangeProps } from '../DatepickerRange';
export interface IDatepickerRangeState {
    previewDate: Date;
    hoverDate?: Date;
    isStartFocused: boolean;
    isEndFocused: boolean;
    startInputValue?: string;
    endInputValue?: string;
}
export declare type DatepickerRangeAction = {
    type: 'HOVER_DATE';
    value?: Date;
} | {
    type: 'CLICK_DATE';
    value: Date;
} | {
    type: 'PREVIEW_NEXT_MONTH';
} | {
    type: 'PREVIEW_PREVIOUS_MONTH';
} | {
    type: 'START_INPUT_ONCHANGE';
    value: string;
} | {
    type: 'END_INPUT_ONCHANGE';
    value: string;
} | {
    type: 'START_BLUR';
} | {
    type: 'END_BLUR';
} | {
    type: 'START_FOCUS';
} | {
    type: 'END_FOCUS';
} | {
    type: 'CONTROLLED_START_VALUE_CHANGE';
    value?: Date;
} | {
    type: 'CONTROLLED_END_VALUE_CHANGE';
    value?: Date;
};
export declare const datepickerRangeReducer: ({ startValue, endValue, locale, formatDate, onChange, customParseDate }: {
    startValue?: Date | undefined;
    endValue?: Date | undefined;
    locale?: string | undefined;
    formatDate?: any;
    onChange?: ((values: {
        startValue?: Date | undefined;
        endValue?: Date | undefined;
    }) => void) | undefined;
    customParseDate?: ((inputValue?: string | undefined) => Date) | undefined;
}) => (state: IDatepickerRangeState, action: DatepickerRangeAction) => IDatepickerRangeState;
/**
 * Retrieve initial state for the Datepicker reducer
 */
export declare function retrieveInitialState(initialProps: IDatepickerRangeProps): IDatepickerRangeState;
