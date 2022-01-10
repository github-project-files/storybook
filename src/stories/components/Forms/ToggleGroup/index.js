// @flow

import React from 'react';
import ToggleRow from '../ToggleRow';
import { Wrapper, ChildrenWrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  label: string,
  description?: string,
  [key: string]: any,
};

// eslint-disable-next-line no-unused-vars
type State = {
  [key: string]: any,
};

/**
 * Helper component that renders a ToggleGroup input within a two column
 * layout, and supports nested toggles that only appear if it is checked.
 * @param {Object} props
 * @return {React$Node}
 */
export default class ToggleGroup extends React.Component<$FlowLintFix, $FlowLintFix> {
  /**
   * @param {Object} props
   */
  constructor(props: Object) {
    super(props);
    this.state = {
      isChecked: props.defaultValue,
    };
  }

  /**
   * hide group
   * @param {Object} value
   */
  handleOnChange = (value: Object) => {
    this.setState({
      isChecked: value,
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  /**
   * @return {React.Component}
   */
  render() {
    const { isChecked } = this.state;
    const { children, ...props } = this.props;
    return (
      <Wrapper>
        <ToggleRow {...props} onChange={this.handleOnChange} defaultChecked={isChecked} />
        <ChildrenWrapper>{isChecked ? children : null}</ChildrenWrapper>
      </Wrapper>
    );
  }
}
