// @flow

import React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line no-unused-vars
type Props = {
  state?: Function | boolean | Array<string>,
  children: Function,
  [key: string]: any,
};

/**
 * Render Prop-based component for connecting to Redux
 * @return {Component}
 */
export default ({ state, children, ...props }: $FlowLintFix) => {
  let mapState = null;

  if (state === true) {
    // eslint-disable-next-line no-shadow
    mapState = state => state;
  } else if (typeof state === 'function') {
    mapState = state;
  } else if (Array.isArray(state)) {
    // eslint-disable-next-line no-shadow
    mapState = state => {
      const mappedState = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const k of state) {
        mappedState[k] = state[k];
      }
      return mappedState;
    };
  }

  const C = connect(mapState)(children);

  return <C {...props} />;
};
