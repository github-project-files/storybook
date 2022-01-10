// @flow

import React, { PureComponent } from 'react';
import { Background, ModalWrapper } from './styled';

// These are props that get injected by MainLayout
export type ModalHOCProps = {
  onClose: () => void,
  t: Function,
};

type Props = {
  children: React$Node,
  maxWidth?: number,
  padding?: number,
};

export { default as ModalHeader } from './ModalHeader';
export { default as ModalBody } from './ModalBody';
export { default as ModalFooter } from './ModalFooter';

class Modal extends PureComponent<Props> {
  /**
   * Render a modal wrapper, along with a tinted background.
   * This is used as a framework for creating consistent-looking modals.
   * @return {React$Node}
   */
  render() {
    const { children, maxWidth, padding } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { maxWidth, padding });
    });

    return (
      <Background>
        <ModalWrapper maxWidth={this.props.maxWidth} padding={this.props.padding}>
          {childrenWithProps}
        </ModalWrapper>
      </Background>
    );
  }
}

export default Modal;
