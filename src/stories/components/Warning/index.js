// @flow

import React, { PureComponent } from 'react';

import { WarningMessage, Alert } from './styled';

type Props = {
  message?: string,
};
class Warning extends PureComponent<Props> {
  /**
   * Render a modal with a form for adding a new user
   * @return {React$Node}
   */
  render() {
    const { message } = this.props;
    return (
      <WarningMessage>
        <Alert /> {message || 'You have exceeded your plan limit. Upgrade your plan today!'}
      </WarningMessage>
    );
  }
}

export default Warning;
