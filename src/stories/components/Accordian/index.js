// @flow

import React, { PureComponent } from 'react';
import { Wrapper, TitleBlock, Body, DownArrow } from './styled';

type Props = {
  header: React$Node,
  body: React$Node,
  alwaysOpen?: boolean,
  useDefaultStyle?: boolean,
  onAccordionToggle?: Function,
  defaultOpen?: boolean,
  className?: string,
};

type State = {
  expanded: boolean,
};

class Accordian extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    expanded: !!this.props.alwaysOpen || !!this.props.defaultOpen,
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    useDefaultStyle: true,
  };

  handleOpenClose = () => {
    if (this.props.alwaysOpen) {
      return;
    }

    if (this.props.onAccordionToggle) {
      this.props.onAccordionToggle(!this.state.expanded);
    }
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ expanded: !this.state.expanded });
  };

  /**
   * Render an accordian
   * @return {React$Node}
   */
  render() {
    return (
      <Wrapper useDefaultStyle={!!this.props.useDefaultStyle} className={this.props.className}>
        <TitleBlock onClick={this.handleOpenClose}>
          {this.props.header}
          {!this.props.alwaysOpen && this.props.useDefaultStyle && (
            <DownArrow up={this.state.expanded.toString()} />
          )}
        </TitleBlock>
        <Body open={!!this.state.expanded}>{this.props.body}</Body>
      </Wrapper>
    );
  }
}

export default Accordian;
