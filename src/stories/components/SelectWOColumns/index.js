// @flow

import React, { PureComponent } from 'react';
import RadioCard from 'components/RadioCard';
import Checkbox from 'components/Checkbox';
import { Label, CheckboxItem, CheckboxWrapper } from './styled';
import columnList from './columnList';

type Props = {
  onColumnChange: Function,
};

type State = {
  selectAll: boolean,
  selectCustom: boolean,
  availableColumns: Array<Object>,
};

class SelectExportType extends PureComponent<Props, State> {
  defaultSelectedColumns = JSON.parse(localStorage.getItem('exportColumns') || '{}');

  woColumns = columnList.map(item => {
    return {
      label: item,
      checked: true,
    };
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      selectAll: true,
      selectCustom: false,
      availableColumns: this.woColumns,
    };
  }

  handleColumnSelect = (value: string) => {
    this.woColumns.map(item => {
      const columnItem = item;
      if (value === 'custom') {
        columnItem.checked =
          this.defaultSelectedColumns &&
          this.defaultSelectedColumns.length &&
          this.defaultSelectedColumns.includes(columnItem.label);
      } else if (value === 'all') {
        columnItem.checked = true;
      }
      return columnItem;
    });

    const radioValue = {
      selectAll: value === 'all',
      selectCustom: value === 'custom',
    };
    this.setState(
      {
        ...radioValue,
        availableColumns: this.woColumns,
      },
      () => {
        this.handleColumnChange();
      },
    );
  };

  handleSelect = (key: string) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const woArray = Array.from(this.state.availableColumns);
    woArray.forEach(item => {
      if (item.label === key) {
        // eslint-disable-next-line no-param-reassign
        item.checked = !item.checked;
      }
    });
    this.setState(
      {
        availableColumns: woArray,
      },
      () => {
        this.handleColumnChange();
      },
    );
  };

  handleColumnChange = () => {
    const { selectCustom, availableColumns } = this.state;
    let allColumn = true;
    if (selectCustom) {
      allColumn = false;
    }
    this.props.onColumnChange(allColumn, availableColumns);
  };

  /**
   * Render an PageHeader
   * @return {React$Node}
   */
  render() {
    const { selectAll, selectCustom, availableColumns } = this.state;
    return (
      <div>
        <Label>Choose Columns</Label>
        <RadioCard
          checked={selectAll}
          valueType="all"
          title="All Columns"
          subtitle="All of your work orders will be exported"
          selectItem={() => this.handleColumnSelect('all')}
        />
        <RadioCard
          checked={selectCustom}
          valueType="custom"
          title="Custom"
          subtitle="Only selected columns will be exported"
          selectItem={() => this.handleColumnSelect('custom')}
        />
        <CheckboxWrapper disableOnSelectAll={selectAll}>
          {availableColumns.map(item => (
            <CheckboxItem enableCheckbox={selectAll} key={item.label}>
              <Checkbox
                className="checkbox-item"
                onClick={() => this.handleSelect(item.label)}
                key={item.label}
                checked={item.checked}
                label={item.label}
              />
            </CheckboxItem>
          ))}
        </CheckboxWrapper>
      </div>
    );
  }
}

export default SelectExportType;
