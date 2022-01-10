// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withSession from 'hocs/withSession';
import type { Session } from 'types';

// eslint-disable-next-line no-unused-vars
type Props = {
  session: Session,
  component: Function,
  isAvailable: Function,
  defaultPath: string,
  [key: string]: any,
};

/**
 * @param {Props} props
 * @return {Component} return route or redirect
 */
const ProtectedRoute = ({ session, component, isAvailable, defaultPath, ...props }: $FlowLintFix) =>
  isAvailable(session) ? (
    <Route component={component} {...props} />
  ) : (
    <Redirect to={{ pathname: defaultPath }} />
  );

export default withSession(ProtectedRoute);
