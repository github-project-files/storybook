// @flow

import React, { PureComponent } from 'react';

// $FlowFixMe
import WithScrolling from 'react-dnd-scrollzone';
import withDragDropContext from 'utils/withDragDropContext';
// $FlowFixMe
import FormItemEdit from './FormItemEdit';
// $FlowFixMe
import FormItemDropTarget from './FormItemDropTarget';

import { Wrapper, NoDataWrapper } from './styled';

type Props = {
  formItems: Array<Object>,
  onUpdateItems: Function,
  disableEditExisting?: boolean,
  showMeterDropdown: Array<boolean>,
  updateMeterDropdownStatus: Function,
  isAssignUserRestricted?: boolean,
};

export const Types = {
  FORM_ITEM: 'formItem',
};

const ScrollingComponent = WithScrolling('div');

class FormTemplateEdit extends PureComponent<Props> {
  handleUpdateItem = (formItem: Object, index: number) => {
    const formItems = this.props.formItems.slice();
    formItems[index] = formItem;
    this.props.onUpdateItems(formItems);
  };

  handleRemoveItem = (index: number) => {
    const formItems = this.props.formItems.slice();
    formItems.splice(index, 1);
    this.props.onUpdateItems(formItems);
  };

  handleMoveItem = (fromIndex: number, toIndex: number) => {
    const formItems = this.props.formItems.slice();
    const itemToMove = formItems.splice(fromIndex, 1)[0];
    formItems.splice(toIndex, 0, itemToMove);
    this.props.onUpdateItems(formItems);
  };

  renderFormItems = () => {
    const { formItems } = this.props;

    if (!formItems || formItems.length === 0) {
      return <NoDataWrapper>Click &ldquo;Add Task&rdquo; to get started</NoDataWrapper>;
    }
    // @flow-disable
    return formItems.map((formItem, idx) => {
      return (
        <div className="item-container" key={formItem.id}>
          <FormItemDropTarget index={idx} onMoveItem={this.handleMoveItem}>
            <FormItemEdit
              formItem={formItem}
              index={idx}
              onUpdate={this.handleUpdateItem}
              onRemove={this.handleRemoveItem}
              disableEditExisting={this.props.disableEditExisting}
              showMeterDropdown={this.props.showMeterDropdown}
              updateMeterDropdownStatus={this.props.updateMeterDropdownStatus}
              isAssignUserRestricted={this.props.isAssignUserRestricted}
            />
          </FormItemDropTarget>
        </div>
      );
    });
    // @flow-enable
  };

  /**
   * Render the edit form for a form template
   * @return {React$Node}
   */
  render() {
    return (
      <Wrapper hasFormItems={this.props.formItems.length > 0}>
        <ScrollingComponent className="scroll-container">
          {this.renderFormItems()}
        </ScrollingComponent>
      </Wrapper>
    );
  }
}

export default withDragDropContext(FormTemplateEdit);
