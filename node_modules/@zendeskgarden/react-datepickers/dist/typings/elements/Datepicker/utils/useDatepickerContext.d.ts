/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
/// <reference types="react" />
import { IDatepickerState, DatepickerAction } from './datepicker-reducer';
export interface IDatepickerContext {
    state: IDatepickerState;
    dispatch: React.Dispatch<DatepickerAction>;
}
export declare const DatepickerContext: import("react").Context<IDatepickerContext | undefined>;
/**
 * Retrieve Dropdown component context
 */
declare const useDatepickerContext: () => IDatepickerContext;
export default useDatepickerContext;
