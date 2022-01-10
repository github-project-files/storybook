// @flow

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Loader from 'components/Loader';
import type { MenuItemType } from './types';

import {
  DropdownWrapper,
  DropdownInner,
  DropdownList,
  DropdownListItem,
  MenuIconWrapper,
} from './styled';

type Props = {
  menuItems: MenuItemType[],
  display: boolean,
  children?: React$Node,
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
  width?: string,
  maxHeight?: string,
  isLoading?: boolean,
  listItemStyle?: Object,
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
                      <span className="label">{item.label}</span>
                      <span>C</span>
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
