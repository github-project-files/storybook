// @flow

import React, { Component } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import * as Actions from 'store/Actions';
import { HeaderWrapper } from './styled';

type Props = {
  columnProps: Array<Object>,
  name: string,
  defaultColumns: Array<string>,
  onClose: () => void,
};

type State = {
  columns: Object,
  defaultColumns: Object,
};

type HeaderProps = {
  header: string,
  description: string,
};

class OptionsModal extends Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    columns: {},
    defaultColumns: Object,
  };

  /**
   * Determine which checkboxes are checked after OptionsModal component loads.
   * Build up an object that stores the display value for each column (boolean).
   * If props.defaultColumns is provided and no settings have been saved, check the provided columns boxes.
   * Otherwise the user has settings that must be loaded.
   * Unlabled columns are saved to state.defaultColumns and must always display - checkbox and row controls.
   * For all other columns, check if the user has previously set
   * preferences and apply them.
   */
  componentDidMount = () => {
    const columns = {};
    const defaultColumns = {};
    const localStorageObject = `${this.props.name}Columns`;

    if (this.props.defaultColumns && !localStorage.hasOwnProperty(localStorageObject)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const obj of this.props.columnProps) {
        const key = obj.dataKey;
        columns[key] = this.props.defaultColumns.includes(key);
      }
      this.setState({ columns });
      return;
    }

    this.props.columnProps.forEach(col => {
      // Unlabled columns are saved to state.defaultColumns
      // and must always display - checkbox and row controls.
      if (!col.hasOwnProperty('label')) {
        columns[col.dataKey] = true;
        defaultColumns[col.dataKey] = true;
      }
      columns[col.dataKey] = this.checkLocalStorage(col.dataKey);
    });

    this.setState({ columns, defaultColumns });
  };

  /**
   * If a user has previously set preferences, use them.
   * Otherwise the checkbox will be checked and the column
   * will display.
   * @param {string} key - columns dataKey
   * @return {boolean}
   */
  checkLocalStorage = (key: string) => {
    const localStorageObject = `${this.props.name}Columns`;
    if (localStorage.hasOwnProperty(localStorageObject)) {
      const savedColumns = localStorage.getItem(localStorageObject);
      const columns = savedColumns && JSON.parse(savedColumns);
      if (columns && typeof columns === 'object') {
        return columns[key];
      }
    } else {
      return true;
    }
  };

  /**
   * Toggle checkbox click handler
   * @param {string} dataKey
   */
  handleOnCheck = (dataKey: string) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const columnsClone = Object.assign(this.state.columns);
    columnsClone[dataKey] = !this.state.columns[dataKey];
    this.setState({ columns: columnsClone });
  };

  /**
   * Select all checkboxes click handler
   */
  handleSelectAll = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const columnsClone = Object.assign(this.state.columns);
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in columnsClone) {
      columnsClone[key] = true;
    }
    this.setState({ columns: columnsClone });
  };

  /**
   * Save state.columns to local storage.
   * Close the modal.
   * Notify user of successful save.
   */
  handleSubmit = () => {
    const { columns } = this.state;
    const localStorageObject = `${this.props.name}Columns`;
    const savedColumns = localStorage.getItem(localStorageObject);
    const tableColumns = savedColumns ? JSON.parse(savedColumns) : {};

    if (Object.keys(columns).length) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in columns) {
        tableColumns[key] = columns[key];
      }
    }

    if (this.validateColumnSelection()) {
      localStorage.setItem(localStorageObject, JSON.stringify(tableColumns));
      this.props.onClose();
      Actions.alertNotification('Column Preferences Saved', 'success');
    } else {
      Actions.alertNotification('Please select at least one column.', 'error');
    }
  };

  /**
   * To save preferences user must select at least one column
   * that is not saved to state.defaultColumns - checkboxes and row controls
   * @return {boolean}
   */
  validateColumnSelection = () => {
    const { columns, defaultColumns } = this.state;
    let valueCheck = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in columns) {
      if (columns[key] && !Object.keys(defaultColumns).includes(key)) {
        valueCheck = true;
      }
    }
    return valueCheck;
  };

  /**
   * Render a modal with a form for selecting table column preferences
   * @return {React$Node}
   */
  render() {
    /**
     * header component to hold title and subtitle
     * @param {Object} props
     * @return {*}
     * @constructor
     */
    const ModelHeaderText = (props: HeaderProps) => {
      return (
        <HeaderWrapper>
          {props.header}
          <span>{props.description}</span>
        </HeaderWrapper>
      );
    };

    return (
      <Modal maxWidth={400} padding={20}>
        <ModalHeader
          header={() => (
            <ModelHeaderText
              header="Table Column Preferences"
              description="(Recommended number of columns is 10 for PDF export)"
            />
          )}
          onClose={this.props.onClose}
        />
        <ModalBody PDFhPadding>
          {// eslint-disable-next-line array-callback-return
          this.props.columnProps.map(col => {
            // unlabled columns must always display - checkbox and row controls
            if (col.hasOwnProperty('label')) {
              return (
                <div key={col.dataKey}>
                  <Checkbox
                    label={col.label}
                    checked={this.state.columns[col.dataKey]}
                    onClick={() => this.handleOnCheck(col.dataKey)}
                  />
                </div>
              );
            }
          })}
        </ModalBody>
        <ModalFooter>
          <Button theme="cancel" type="submit" pill onClick={this.props.onClose}>
            cancel
          </Button>
          <Button theme="blue-gradient" pill onClick={this.handleSelectAll}>
            Select All
          </Button>
          <Button theme="blue-gradient" pill onClick={this.handleSubmit}>
            Apply
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default OptionsModal;
