// @flow

import React from 'react';
import Loader from 'components/Loader';
import { Wrapper } from './styled';

// Themes
// 'white-outline'
// 'blue-gradient' | 'red-gradient'
// 'filter' | 'filter-active' | 'cancel'
// 'blue' | 'red' | 'green' | 'white' | 'transparent' | 'dark-green
type Props = {
  children: React$Node,
  onClick?: Function,
  theme?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xl' | 'xxl' | 'xxxl',
  thin?: boolean,
  pill?: boolean,
  loading?: boolean,
  disabled?: boolean,
  disabledBackground?: string,
  type?: 'button' | 'submit' | 'reset',
  form?: string,
  className?: string,
};

export default (props: Props) => {
  return (
    <Wrapper
      theme={props.theme}
      size={props.size}
      thin={props.thin}
      pill={props.pill}
      onClick={(...args) => {
        if (props.disabled || props.loading || typeof props.onClick !== 'function') {
          return;
        }

        props.onClick(...args);
      }}
      disabled={props.loading || props.disabled}
      disabledBackground={props.disabledBackground}
      loading={props.loading}
      className={props.className}
      type={props.type || 'button'}
      form={props.form || undefined}
    >
      {props.loading ? <Loader size="sm" /> : props.children}
    </Wrapper>
  );
};
