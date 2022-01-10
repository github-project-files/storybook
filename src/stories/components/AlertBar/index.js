// @flow

import React, { PureComponent } from 'react';
import { Wrapper, OuterWrapper, CloseIcon } from './styled';

type Props = {
  children: React$Node,
  theme?: 'none' | 'gray' | 'red' | 'blue' | 'yellow' | 'green',
  dismissable?: boolean,
  onDismiss?: Function,
};

type State = {
  dismissed: boolean,
};

class AlertBar extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    dismissed: false,
  };

  handleDismiss = () => {
    const { onDismiss } = this.props;
    this.setState({ dismissed: true });
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  };

  /**
   * Render an Alertbar
   * @return {React$Node}
   */
  render() {
    const { props, state } = this;
    return !state.dismissed ? (
      <OuterWrapper>
        <Wrapper theme={props.theme} dismissable={props.dismissable}>
          {props.children}
        </Wrapper>
        {props.dismissable ? <CloseIcon onClick={this.handleDismiss} /> : null}
      </OuterWrapper>
    ) : null;
  }
}

export default AlertBar;
