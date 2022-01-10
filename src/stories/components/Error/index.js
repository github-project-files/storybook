// @flow

import React, { PureComponent } from 'react';
import Button from 'components/Button';
import Page from 'components/Page';

import { PageTitle, Details } from './styled';

type Props = {
  title: string,
  error: string,
  errorInfo?: string,
  showReload?: boolean,
};

class Error extends PureComponent<Props> {
  /**
   * Render the Error component
   * @return {React$Node}
   */
  render() {
    return (
      <Page withMargin>
        <PageTitle>{this.props.title}</PageTitle>
        {this.props.showReload && (
          <Button theme="blue-gradient" pill onClick={() => window.location.reload()}>
            Refresh
          </Button>
        )}
        <Details>
          <summary>{this.props.error}</summary>
          <br />
          {this.props.errorInfo ? this.props.errorInfo : ''}
        </Details>
      </Page>
    );
  }
}

export default Error;
