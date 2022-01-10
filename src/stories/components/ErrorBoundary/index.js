// @flow

import React, { PureComponent } from 'react';
import Button from 'components/Button';
import Page from 'components/Page';

import { PageTitle, Details } from './styled';

type Props = {
  children: React$Node,
};

type State = {
  error: null | boolean,
  errorInfo: null | Object,
};

class ErrorBoundary extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    error: null,
    errorInfo: null,
  };

  /**
   * Catch errors in any child component and re-render with error message
   * @param {boolean} error
   * @param {string} errorInfo
   */
  componentDidCatch = (error: boolean, errorInfo: Object) => {
    this.setState({ error, errorInfo });
    /**
     * Send error events to instana with errorInfo
     */
    if (window.ineum) {
      window.ineum('reportError', error, {
        componentStack: errorInfo.componentStack,
      });
    }
  };

  /**
   * Render the ErrorBoundary component
   * @return {React$Node}
   */
  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      return (
        <Page withMargin>
          <PageTitle>Something went wrong.</PageTitle>
          <Button theme="blue-gradient" pill onClick={() => window.location.reload()}>
            Refresh
          </Button>
          <Details>
            <summary>More information</summary>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </Details>
        </Page>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
