/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { CheckCircleStrokeIcon } from './check-circle';
import { AlertErrorStrokeIcon } from './alert-error';
import { AlertWarningStrokeIcon } from './alert-warning';
import { InfoStrokeIcon } from './info-stroke';
import { VALIDATION_TYPE } from './types';

export const validationIcons: Record<VALIDATION_TYPE, Record<string, unknown>> = {
  success: CheckCircleStrokeIcon,
  error: AlertErrorStrokeIcon,
  warning: AlertWarningStrokeIcon,
  info: InfoStrokeIcon
};

export const validationHues: Record<VALIDATION_TYPE, string> = {
  success: 'successHue',
  error: 'dangerHue',
  warning: 'warningHue',
  info: 'neutralHue'
};
