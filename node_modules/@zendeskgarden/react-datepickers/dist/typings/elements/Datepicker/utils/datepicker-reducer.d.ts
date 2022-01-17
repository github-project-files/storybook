/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
import { IDatepickerProps } from '../Datepicker';
export interface IDatepickerState {
    isOpen: boolean;
    previewDate: Date;
    inputValue: string;
}
export declare type DatepickerAction = {
    type: 'OPEN';
} | {
    type: 'CLOSE';
} | {
    type: 'PREVIEW_NEXT_MONTH';
} | {
    type: 'PREVIEW_PREVIOUS_MONTH';
} | {
    type: 'MANUALLY_UPDATE_INPUT';
    value: string;
} | {
    type: 'CONTROLLED_VALUE_CHANGE';
    value?: Date;
} | {
    type: 'CONTROLLED_LOCALE_CHANGE';
} | {
    type: 'SELECT_DATE';
    value: Date;
};
export declare const datepickerReducer: ({ value, formatDate, locale, customParseDate, onChange }: {
    value?: Date | undefined;
    formatDate?: ((date: Date) => string) | undefined;
    locale: any;
    customParseDate?: ((inputValue: string) => Date) | undefined;
    onChange?: ((date: Date) => void) | undefined;
}) => (state: IDatepickerState, action: DatepickerAction) => IDatepickerState;
/**
 * Retrieve initial state for the Datepicker reducer
 */
export declare function retrieveInitialState(initialProps: IDatepickerProps): IDatepickerState;
