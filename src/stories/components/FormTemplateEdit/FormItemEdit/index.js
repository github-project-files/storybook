// @flow

import React, { PureComponent } from 'react';
import { DragSource } from 'react-dnd';
import { DraggableItemTypes } from 'utils/Constants';
import DropdownMenu from 'components/DropdownMenu';
import SelectUser from 'components/SelectUser';
import Button from 'components/Button';
import SelectAsset from 'components/SelectAsset';
import SelectMeter from 'components/SelectMeter';
import { USER_ROLES } from 'constants/userRoles';
import {
  Wrapper,
  DragWrapper,
  LeftWrapper,
  RightWrapper,
  HeaderRow,
  BodyRow,
  OptionRow,
  DraggableIcon,
  RemoveIcon,
  OptionsIcon,
  StyledInput,
} from './styled';

type Props = {
  index: number,
  formItem: Object,
  onUpdate: Function,
  onRemove: Function,
  connectDragSource?: Function,
  disableEditExisting?: boolean,
  showMeterDropdown: Array<boolean>,
  updateMeterDropdownStatus: Function,
  isAssignUserRestricted?: boolean,
};

type State = {
  showOptions: boolean,
  showTypes: boolean,
  showUserDropdown: boolean,
  showAssetDropdown: boolean,
  overInput: boolean,
};

const formItemSource = {
  beginDrag(props) {
    return {
      fromIndex: props.index,
    };
  },
};

class FormItemEdit extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showOptions: false,
    showTypes: false,
    showUserDropdown: false,
    // eslint-disable-next-line react/no-unused-state
    showMeterDropdown: false,
    overInput: false,
  };

  /**
   * Render a form item edit view
   * @return {React$Node}
   */
  render() {
    const {
      index,
      formItem,
      connectDragSource,
      onUpdate,
      onRemove,
      disableEditExisting,
    } = this.props;

    const { showOptions, showTypes, showUserDropdown, showAssetDropdown, overInput } = this.state;

    const typeLabels = {
      TASK: 'Sub-task Status',
      TEXT: 'Text Field',
      NUMBER: 'Number Field',
      CHECKLIST: 'Inspection Check',
      MULTIPLE_CHOICE: 'Multiple Choice',
      METER_READING: 'Meter Reading',
    };

    /**
     * Add option for multiple choice form items
     */
    const handleAddOption = () => {
      const updatedFormItem = { ...formItem };
      const options = updatedFormItem.options.slice();
      options.push('');
      updatedFormItem.options = options;
      onUpdate(updatedFormItem, index);
    };

    /**
     * Update option value for multiple choice form items
     * @param {Object} event
     * @param {number} optionIndex
     */
    const handleUpdateOption = (event: Object, optionIndex: number) => {
      const updatedFormItem = { ...formItem };
      const options = updatedFormItem.options.slice();
      options[optionIndex] = event.target.value;
      updatedFormItem.options = options;
      onUpdate(updatedFormItem, index);
    };

    /**
     * Remove option value for multiple choice form items
     * @param {number} optionIndex
     */
    const handleRemoveOption = (optionIndex: number) => {
      const updatedFormItem = { ...formItem };
      const options = updatedFormItem.options.slice();
      options.splice(optionIndex, 1);
      updatedFormItem.options = options;
      onUpdate(updatedFormItem, index);
    };

    /**
     * Update form item description
     * @param {Object} event
     */
    const handleUpdateName = (event: Object) => {
      const updateFormItem = { ...formItem };
      updateFormItem.name = event.target.value;
      onUpdate(updateFormItem, index);
    };

    /**
     * Update form item user assigned
     * @param {Object} selection
     */
    const handleAssignUser = (selection: Object) => {
      let user;

      if (selection) {
        user = {
          id: selection.value,
          name: selection.label,
        };
      } else {
        user = null;
      }

      const updatedFormItem = { ...formItem };
      updatedFormItem.user = user;
      onUpdate(updatedFormItem, index);

      if (!user) {
        this.setState({ showUserDropdown: false });
      }
    };

    /**
     * Update form item user assigned
     * @param {Object} selection
     */
    const handleAssignAsset = (selection: Object) => {
      let asset;

      if (selection) {
        asset = {
          id: selection.value,
          name: selection.label,
        };
      } else {
        asset = null;
      }

      const updatedFormItem = { ...formItem };
      updatedFormItem.asset = asset;
      onUpdate(updatedFormItem, index);

      if (!asset) {
        this.setState({ showAssetDropdown: false });
      }
    };

    /**
     * Update form item meter assigned
     * @param {Object} selection
     */
    const handleAssignMeter = (selection: Object) => {
      let meter;

      if (selection) {
        meter = {
          id: selection.value,
          name: selection.label,
        };
      } else {
        meter = null;
      }

      const updatedFormItem = { ...formItem };
      updatedFormItem.meter = meter;
      onUpdate(updatedFormItem, index);

      if (!meter) {
        this.props.updateMeterDropdownStatus(false, index);
      }
    };

    /**
     * Update form item type
     * @param {string} type
     */
    const handleChangeItemType = (type: string) => {
      window.analytics.track(`FormTemplate-${type}`, {
        category: 'FormTemplate',
      });

      const updateFormItem = { ...formItem };
      updateFormItem.type = type;

      if (type === 'MULTIPLE_CHOICE' && !updateFormItem.options) {
        updateFormItem.options = [''];
      }

      if (type === 'METER_READING') {
        this.props.updateMeterDropdownStatus(true, index);
      } else {
        this.props.updateMeterDropdownStatus(false, index);
        updateFormItem.meter = null;
      }

      onUpdate(updateFormItem, index);
      this.setState({ showTypes: false });
    };

    // /**
    // * Toggle whether form item is required or not
    // */
    // const handleToggleRequired = () => {
    //   const updateFormItem = { ...formItem };
    //   updateFormItem.required = !updateFormItem.required;
    //   onUpdate(updateFormItem, index);
    //   this.setState({ showOptions: false });
    // };

    /**
     * Toggle visibility of user dropdown
     */
    const handleToggleAssignUser = () => {
      window.analytics.track('FormTemplate-AssignUser', {
        category: 'FormTemplate',
      });
      this.setState({
        showOptions: false,
        showUserDropdown: !showUserDropdown,
      });
    };

    /**
     * Toggle visibility of asset dropdown
     */
    const handleToggleAssignAsset = () => {
      window.analytics.track('FormTemplate-AssignAsset', {
        category: 'FormTemplate',
      });
      this.setState({
        showOptions: false,
        showAssetDropdown: !showAssetDropdown,
      });
    };

    const menuItems = [
      // {
      //   label: (() => {
      //     return formItem.required ? 'Require this field  ✔' : 'Require this field';
      //   })(),
      //   handleOnClick: handleToggleRequired,
      // },
      {
        label: formItem.user ? 'Assign User  ✔' : 'Assign User',
        handleOnClick: handleToggleAssignUser,
        disabled: this.props.isAssignUserRestricted,
      },
      {
        label: formItem.asset ? 'Assign Asset  ✔' : 'Assign Asset',
        handleOnClick: handleToggleAssignAsset,
      },
    ];

    const typeOptions = [
      { label: 'Sub-task Status', handleOnClick: () => handleChangeItemType('TASK') },
      { label: 'Text Field', handleOnClick: () => handleChangeItemType('TEXT') },
      { label: 'Number Field', handleOnClick: () => handleChangeItemType('NUMBER') },
      { label: 'Inspection Check', handleOnClick: () => handleChangeItemType('CHECKLIST') },
      { label: 'Multiple Choice', handleOnClick: () => handleChangeItemType('MULTIPLE_CHOICE') },
      { label: 'Meter Reading', handleOnClick: () => handleChangeItemType('METER_READING') },
    ];

    /**
     * Render form item body
     * @return {React$Node}
     */
    const renderFormBody = () => {
      if (formItem.type === 'MULTIPLE_CHOICE') {
        const options = [];
        // eslint-disable-next-line no-unused-expressions
        formItem.options &&
          // eslint-disable-next-line no-shadow
          formItem.options.forEach((option, index) => {
            options.push(
              <OptionRow>
                <StyledInput
                  value={option}
                  onMouseEnter={() => this.setState({ overInput: true })}
                  onMouseLeave={() => this.setState({ overInput: false })}
                  onChange={event => handleUpdateOption(event, index)}
                  disabled={disableEditExisting && formItem.id}
                />
                {!(disableEditExisting && formItem.id) && (
                  <RemoveIcon onClick={() => handleRemoveOption(index)} />
                )}
              </OptionRow>,
            );
          });

        return (
          <div>
            <BodyRow>
              <span className="option-instruction">
                Create at least 2 options for the assignee to choose from:
              </span>
              {options}
            </BodyRow>
            <BodyRow className="add-option-button" onClick={handleAddOption}>
              <Button theme="transparent" size="sm" disabled={disableEditExisting && formItem.id}>
                + Add New Option
              </Button>
            </BodyRow>
          </div>
        );
      }

      return null;
    };

    const renderObject = (
      <div>
        <Wrapper>
          <DragWrapper>
            <DraggableIcon />
          </DragWrapper>
          <LeftWrapper>{index + 1}</LeftWrapper>
          <RightWrapper>
            <HeaderRow>
              <StyledInput
                value={formItem.name}
                onChange={handleUpdateName}
                onMouseEnter={() => this.setState({ overInput: true })}
                onMouseLeave={() => this.setState({ overInput: false })}
                disabled={disableEditExisting && formItem.id}
              />
              <DropdownMenu
                menuItems={typeOptions}
                display={showTypes}
                width="130"
                offsetX="7"
                offsetY="30"
                direction="bottom-left"
              >
                <Button
                  theme="transparent"
                  size="sm"
                  onClick={() => this.setState({ showTypes: !showTypes })}
                  disabled={disableEditExisting && formItem.id}
                >
                  {(() => {
                    if (formItem.type === 'NUMBER' && formItem.meter) {
                      return typeLabels.METER_READING;
                    }
                    return typeLabels[formItem.type];
                  })()}
                </Button>
              </DropdownMenu>
              <RemoveIcon onClick={() => onRemove(index)} />
              <DropdownMenu
                menuItems={menuItems}
                display={showOptions}
                width="130"
                offsetX="14"
                direction="bottom-left"
              >
                <OptionsIcon onClick={() => this.setState({ showOptions: !showOptions })} />
              </DropdownMenu>
            </HeaderRow>
            {renderFormBody()}
            {(() => {
              if (showUserDropdown || formItem.user) {
                return (
                  <BodyRow>
                    <SelectUser
                      className="_test-field-user"
                      label="Assigned To"
                      placeholder="Assigned To"
                      value={formItem.user ? formItem.user.id : null}
                      name="assignedTo"
                      useLegacy
                      fieldType="select"
                      excludeUserTypes={[USER_ROLES.VIEW_ONLY]}
                      onChange={selection => handleAssignUser(selection)}
                      raw
                      clearable
                    />
                  </BodyRow>
                );
              }
            })()}
            {(() => {
              if (showAssetDropdown || formItem.asset) {
                return (
                  <BodyRow>
                    <SelectAsset
                      className="_test-field-asset"
                      label="Asset"
                      placeholder="Asset"
                      value={formItem.asset ? formItem.asset.id : null}
                      name="assignedTo"
                      useLegacy
                      fieldType="select"
                      onChange={selection => handleAssignAsset(selection)}
                      raw
                      clearable
                    />
                  </BodyRow>
                );
              }
            })()}
            {(() => {
              if (
                this.props.showMeterDropdown[index] ||
                formItem.meter ||
                formItem.type === 'METER_READING'
              ) {
                return (
                  <BodyRow>
                    <SelectMeter
                      className="_test-field-asset"
                      label="Meter"
                      placeholder="Meter"
                      value={formItem.meter ? formItem.meter.id : null}
                      name="assignedTo"
                      useLegacy
                      fieldType="select"
                      onChange={selection => handleAssignMeter(selection)}
                      disabled={formItem.id && disableEditExisting}
                      raw
                    />
                  </BodyRow>
                );
              }
            })()}
          </RightWrapper>
        </Wrapper>
      </div>
    );

    // eslint-disable-next-line no-nested-ternary
    return overInput ? renderObject : connectDragSource ? connectDragSource(renderObject) : null;
  }
}

export default DragSource(DraggableItemTypes.FORM_ITEM, formItemSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(FormItemEdit);
