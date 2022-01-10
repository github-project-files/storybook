// @flow

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Loader from 'components/Loader';
import AssigneeGroup from 'components/AssigneeGroup';
import Tooltip from 'components/Tooltip';
import type { MenuItemType } from './types';

import {
  DropdownWrapper,
  DropdownInner,
  DropdownList,
  DropdownListItem,
  DropdownListItemInner,
  DropdownHeader,
  SelectionIcon,
  AssigneeWrapper,
  DeleteListItem,
  CloseIcon,
  MenuIconWrapper,
  NestedChev,
} from './styled';

type Props = {
  menuItems: MenuItemType[],
  display: boolean,
  children?: React$Node,
  selection?: Array<string>,
  selectionIcon?: React$Node,
  persistentIcon?: boolean,
  offsetX?: string,
  offsetY?: string,
  // eslint-disable-next-line react/no-unused-prop-types
  onMouseLeave?: Function,
  direction?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right',
  header?: React$Node | *,
  width?: string,
  maxHeight?: string,
  isLoading?: boolean,
  listItemStyle?: Object,
  deleteItem?: boolean,
  handleDelete?: Function,
};

class DropdownMenu extends PureComponent<Props> {
  wrapper: HTMLDivElement | null;

  menuDirection = null;

  componentDidMount = () => {
    this.menuDirection = this.manageDirection();
  };

  componentDidUpdate = () => {
    this.menuDirection = this.manageDirection();
  };

  /**
   * Determine if menu item has been selected
   * @param {Object} item
   * @param {Array} options
   * @return {boolean}
   */
  isSelected = (item: Object, options: Array<string>) => {
    // Matching by id - assignedTo, location, costCategories
    if (item.key === 'assignedTo' || item.key === 'location' || item.key === 'costCategories') {
      return options.includes(item.id);
    }

    // Matching by quickFilter
    if (item.key === 'quickFilter') {
      return options.includes(item.label);
    }

    // Matching by moment object - dateRange
    if (item.key === 'dateRange') {
      const formattedStart = moment(item.value.start).format('MMM D');
      const formattedEnd = moment(item.value.end).format('MMM D');
      return options.includes(`${formattedStart} - ${formattedEnd}`);
    }

    // Matching by label - dueDate, backlog, status, priority
    const formattedOptions = options.map(option => option.toUpperCase().replace(/ /g, '_'));
    const formattedListItem = item.label.toUpperCase().replace(/ /g, '_');
    console.log('formattedOptions', formattedOptions, formattedListItem);
    return formattedOptions.includes(formattedListItem);
  };

  /**
   * Manage click event to stopPropagation
   * before firing event
   * @param {Object} event
   * @param {Function} clickHandler
   */
  handleOnClick = (event: Object, clickHandler: Function) => {
    event.stopPropagation();
    clickHandler();
  };

  /**
   * Render default SelectionIcon if one is not provided
   * @param {Object} item
   * @return {React$Node}
   */
  renderSelectionIcon = (item: Object) => {
    const selected = this.props.selection && this.isSelected(item, this.props.selection);
    if (this.props.persistentIcon) {
      return <SelectionIcon selected={selected} deleteItem={this.props.deleteItem} />;
    }
    return selected && this.props.selectionIcon;
  };

  /**
   * Render delete icon if this.props.deleteItem is true
   * @param {Object} item
   * @return {React$Node}
   */
  renderDeleteIcon = (item: Object) => {
    if (this.props.deleteItem && this.props.handleDelete) {
      return (
        <DeleteListItem
          onClick={e => this.props.handleDelete && this.props.handleDelete(e, item.label)}
        >
          <Tooltip value="Delete" id={item.label} effect="solid" place="top">
            <CloseIcon />
          </Tooltip>
        </DeleteListItem>
      );
    }
  };

  /**
   * Render Menu Icon
   */

  renderMenuIcon = (item: Object) => {
    if (item.menuIcon) {
      return (
        <MenuIconWrapper>
          <item.menuIcon />
        </MenuIconWrapper>
      );
    }
    return null;
  };

  manageDirection = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const wrapper = ReactDOM.findDOMNode(this.wrapper);
    // $FlowFixMe
    const { top } = wrapper.getBoundingClientRect();
    const height = 32 * this.props.menuItems.length;

    return top + height >= 0 && top + height <= window.innerHeight ? 'bottom-left' : 'top-left';
  };

  /**
   * Render DropdownMenu to the DOM
   * @return {React$Node}
   */
  render() {
    return (
      <DropdownWrapper
        ref={
          // eslint-disable-next-line no-return-assign
          r => (this.wrapper = r)
        }
      >
        {this.props.children}
        {this.props.display && (
          <DropdownInner
            offsetX={this.props.offsetX}
            offsetY={this.props.offsetY}
            direction={this.props.direction || this.menuDirection}
            width={this.props.width}
            maxHeight={this.props.maxHeight}
          >
            {this.props.header && (
              <DropdownHeader width={this.props.width}>{this.props.header}</DropdownHeader>
            )}
            <DropdownList>
              {this.props.isLoading ? (
                <span>
                  <Loader />
                </span>
              ) : (
                this.props.menuItems.map((item, idx) => {
                  if (item.disabled) {
                    return null;
                  }

                  return (
                    <DropdownListItem
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${item.label}-${idx}`}
                      style={this.props.listItemStyle}
                      onClick={event =>
                        item.allowed !== false
                          ? this.handleOnClick(event, item.handleOnClick)
                          : null
                      }
                    >
                      {item.assignedTo && item.id && (
                        <AssigneeWrapper>
                          <AssigneeGroup
                            id={item.id}
                            assignedTo={item.assignedTo}
                            threshold={1}
                            size="sm"
                            tooltip="false"
                          />
                        </AssigneeWrapper>
                      )}
                      {this.renderMenuIcon(item)}
                      <DropdownListItemInner>
                        {item.nested ? <NestedChev /> : null}
                        <span>{item.label}</span>
                      </DropdownListItemInner>
                      {this.renderDeleteIcon(item)}
                      {this.renderSelectionIcon(item)}
                    </DropdownListItem>
                  );
                })
              )}
            </DropdownList>
          </DropdownInner>
        )}
      </DropdownWrapper>
    );
  }
}

export default DropdownMenu;
