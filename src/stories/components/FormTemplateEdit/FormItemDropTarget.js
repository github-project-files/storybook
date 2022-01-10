// @flow

import React, { PureComponent } from 'react';
import { DropTarget } from 'react-dnd';
import { DraggableItemTypes } from 'utils/Constants';

import { Wrapper } from './styled';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  index: number,
  // eslint-disable-next-line react/no-unused-prop-types
  onMoveItem: Function,
  children: React$Node,
  isOver?: boolean,
  initialOffset?: Object,
  currentOffset?: Object,
  connectDropTarget?: Function,
};

const formItemTarget = {
  hover() {},
  drop(props, monitor) {
    props.onMoveItem(monitor.getItem().fromIndex, props.index);
  },
};

class FormItemTarget extends PureComponent<Props> {
  /**
   * Render a form item edit view
   * @return {React$Node}
   */
  render() {
    const { children, isOver, initialOffset, currentOffset, connectDropTarget } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <Wrapper
            isOver={isOver}
            above={initialOffset && currentOffset && initialOffset.y > currentOffset.y}
          >
            {children}
          </Wrapper>
        </div>,
      )
    );
  }
}

export default DropTarget(DraggableItemTypes.FORM_ITEM, formItemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  initialOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getClientOffset(),
}))(FormItemTarget);
