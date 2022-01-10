// @flow

import React, { PureComponent } from 'react';
import { Wrapper, Section } from './styled';

import Tab from './Tab';

type ItemType = 'tab' | 'dropdown-tab' | 'dropdown-nav' | 'checkbox';

type DropdownNavItem = {
  label: string,
  // eslint-disable-next-line no-use-before-define
  onSelectItem: ControlBarItem => void,
};

export type ControlBarItem = {
  type: ItemType,
  label: string,
  value: boolean | string,
  dropdownValues?: Array<string | DropdownNavItem>,
  data: any,
};

type Props = {
  onSelectItem: ControlBarItem => void,
  left?: ?Array<ControlBarItem>,
  center?: ?Array<ControlBarItem>,
  right?: ?Array<ControlBarItem>,
  className?: string,
  theme?: string,
};

class ControlBar extends PureComponent<Props> {
  renderDropdownToggle = () => null;

  renderDropdownNav = () => null;

  renderCheckbox = () => null;

  /**
   * Render list of control bar items
   * @param {Array<Object>} items
   * @return {React$Node}
   */
  renderItems = (items: Array<ControlBarItem>): Array<React$Node> =>
    items.map((item, i) => {
      if (item.type === 'tab') {
        // eslint-disable-next-line react/no-array-index-key
        return (
          <Tab
            // eslint-disable-next-line react/no-array-index-key
            key={`tab-${i}`}
            onSelectItem={this.props.onSelectItem}
            item={item}
            theme={this.props.theme}
          />
        );
      }

      if (item.type === 'dropdown-toggle') {
        return this.renderDropdownToggle();
      }

      if (item.type === 'dropdown-nav') {
        return this.renderDropdownNav();
      }

      if (item.type === 'checkbox') {
        return this.renderCheckbox();
      }

      return null;
    });

  /**
   * Renders a super-customizable control bar.
   * The control bar has three main sections:
   *   - left justified items
   *   - center items
   *   - right justified items
   * Each ControlBarItem can be a tab, a label with a dropdown value, and more
   * @param {Object} props
   * @return {React$Node}
   */
  render() {
    const { left, center, right, className } = this.props;

    return (
      <Wrapper className={className}>
        {left && left.length ? <Section>{this.renderItems(left)}</Section> : null}

        {center && center.length ? <Section>{this.renderItems(center)}</Section> : null}

        {right && right.length ? <Section>{this.renderItems(right)}</Section> : null}
      </Wrapper>
    );
  }
}

export default ControlBar;
