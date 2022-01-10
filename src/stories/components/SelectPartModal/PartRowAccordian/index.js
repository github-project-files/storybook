// @flow

import React, { PureComponent } from 'react';
import Checkbox from 'components/Checkbox';
import { PartTableCell } from '../../../scenes/WorkOrders/WorkOrderPanel/WorkOrderView/PartAccordian/styled';

import { ChildRow, ChildCell, DownArrow } from './styled';

type Props = {
  partSetInfo: Object,
  currencySymbol: string,
  selectPart: Function,
  defaultChecked: boolean,
  updateSelectList: Function,
};

type State = {
  toggleActive: boolean,
  checkBoxState: boolean,
};

class PartRowAccordian extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    toggleActive: this.props.defaultChecked,
    checkBoxState: this.props.defaultChecked,
  };

  handleToggleList = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      toggleActive: !this.state.toggleActive,
    });
  };

  handlePartSetSelect = (partSetId: string) => {
    const { parts } = this.props.partSetInfo;
    let partIds = [];
    if (parts && parts.length) {
      partIds = parts.map(item => item.id);
    }
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      checkBoxState: !this.state.checkBoxState,
    });
    this.props.updateSelectList(partSetId);
    this.props.selectPart(partIds);
  };

  /**
   * Render set of parts vieww
   * @return {React$Node}
   */
  render() {
    const { partSetInfo, currencySymbol } = this.props;
    const { toggleActive, checkBoxState } = this.state;
    let qty = 0;
    let cost = 0;

    if (partSetInfo && partSetInfo.parts && partSetInfo.parts.length) {
      partSetInfo.parts.forEach(item => {
        qty += item.quantity;
        cost += item.cost;
      });
    }

    return (
      <>
        <tr>
          <PartTableCell>
            <Checkbox
              onClick={() => this.handlePartSetSelect(partSetInfo.id)}
              checked={checkBoxState}
            />
          </PartTableCell>
          <PartTableCell onClick={this.handleToggleList}>
            {partSetInfo.name}
            <DownArrow up={toggleActive.toString()} />
          </PartTableCell>
          <PartTableCell>{qty}</PartTableCell>
          <PartTableCell>
            {currencySymbol}
            {cost ? cost.toFixed(2) : 0}
          </PartTableCell>
        </tr>
        {partSetInfo.parts.map(item => (
          <ChildRow active={toggleActive} ifSelected={checkBoxState}>
            <ChildCell />
            <ChildCell align="left">{item.name}</ChildCell>
            <ChildCell>{item.quantity}</ChildCell>
            <ChildCell>
              {currencySymbol}
              {item.cost ? item.cost.toFixed(2) : 0}
            </ChildCell>
          </ChildRow>
        ))}
      </>
    );
  }
}

export default PartRowAccordian;
