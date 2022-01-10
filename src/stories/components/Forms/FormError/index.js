// @flow

import React from 'react';
import { Wrapper } from './styled';

type Props = {
  children: React$Node,
};

/**
 * Basic form field error that shows below most
 * input fields when a validation error is present
 * @example <FormError>Email is invalid</FormError>
 * @param {Object} props
 * @return {React$Node}
 */
export default (props: Props) => <Wrapper>{props.children}</Wrapper>;
