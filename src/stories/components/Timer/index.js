// @flow

import React from 'react';
import { humanizeSeconds } from 'utils';

type State = {
  time: number,
};

type Props = {
  raw?: boolean,
  startTime: number,
};

class Timer extends React.PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    time: 0,
  };

  timer = null;

  componentDidMount = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.timer = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  /**
   * Render TimerOptions Component.
   * @return {React$Node}
   */
  render() {
    const { time } = this.state;
    const { raw, startTime } = this.props;
    return <span>{raw ? startTime + time : humanizeSeconds(startTime + time)}</span>;
  }
}

export default Timer;
