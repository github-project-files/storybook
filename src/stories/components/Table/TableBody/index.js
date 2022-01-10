// @flow
import React, { PureComponent } from 'react';
import Draggable from 'react-draggable';
import { Column, Table, AutoSizer, SortDirection, InfiniteLoader } from 'react-virtualized';
import { fromJS } from 'immutable';
import Row from 'components/Table/Row';
import Tooltip from 'components/Tooltip';
import * as Actions from 'store/Actions';

import { withErrorBoundary } from 'utils/hocs';
import PageError from 'components/ErrorComponent/PageError';
import {
  TableWrapper,
  DragHandle,
  UpIcon,
  DownIcon,
  OptionsIcon,
  SettingsWrapperWhenIcon,
  SettingsWrapperWhenText,
  SettingsIcon,
  SettingsButtonTextWrapper,
  CustomizeColumnsButton,
  TableHeader,
} from './styled';
import OptionsModal from '../OptionsModal';

type State = {
  widths: Object,
  customRows: Array<string>,
  sortDirection: 'ASC' | 'DESC',
};

type Props = {
  name: string,
  tableData: Array<Object>,
  columnProps: Array<Object>,
  loading?: boolean,
  noTableData?: Function,
  disableHeader: boolean,
  sortBy: string,
  sortDirection: 'ASC' | 'DESC',
  onSortChange: Function,
  onRowMouseOver: Function,
  onRowMouseLeave: Function,
  activeRow: string,
  displayDropdown: boolean,
  key?: number,
  style?: Object,
  onLoadMore?: Function,
  isRowLoaded?: Function,
  remoteRowCount: number,
  onRowClick: Function,
  index?: number,
  APISort?: boolean,
  getCustomWidths?: Function,
  draggable?: boolean,
  defaultColumns?: Array<string>,
  customizeColumnButtonType: 'text' | 'icon',
  rowHeight?: number,
};

class TableBody extends PureComponent<Props, State> {
  TOTAL_WIDTH = window.innerWidth - 20;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    widths: {},
    customRows: [],
    // eslint-disable-next-line react/no-unused-state
    sortedData: [],
    // eslint-disable-next-line react/no-unused-state
    sortDirection: 'ASC',
  };

  /**
   * After the TableBody has rendered check for column widths in local storage.
   * Widths are saved to local storage after the first time a user views a table.
   * Use the widths object from local storage if its there, otherwise use the
   * preset widths from columnProps.
   *
   * Widths are saved as a ratio of the total screen width.
   */
  // eslint-disable-next-line react/sort-comp
  componentDidMount = () => {
    const { columnProps } = this.props;
    const localStorageObject = this.localStorageObject();
    let widths = {};

    if (localStorageObject.storage && localStorageObject.widths) {
      widths = localStorageObject.widths;
    } else {
      columnProps.forEach(col => {
        widths[col.dataKey] = col.width / this.TOTAL_WIDTH;
      });
    }

    this.setState({ widths });
  };

  /**
   * When a user resizes a column update parent state with new widths.
   * Update sort direction when a user clicks a column header (Non API sorting only).
   */
  componentDidUpdate = () => {
    const { widths } = this.state;
    const { getCustomWidths, sortBy, sortDirection, tableData, APISort } = this.props;

    // eslint-disable-next-line no-unused-expressions
    getCustomWidths && getCustomWidths(widths);

    if (!APISort) {
      this.sortedData = this.sortData(sortBy, sortDirection, tableData);
    }
  };

  /**
   * Build up object with listViewWidth data
   * @return {Object}
   */
  localStorageObject = () => {
    const output = {};
    if (
      localStorage.hasOwnProperty('listViewWidths') &&
      window.location.pathname.includes('/web/work-orders')
    ) {
      const savedWidths = localStorage.getItem('listViewWidths');
      const parsedWidths = savedWidths && JSON.parse(savedWidths);
      output.storage = true;
      output.widths = parsedWidths;
    } else {
      output.storage = false;
    }
    return output;
  };

  /**
   *
   * @param {string} sortBy
   * @param {Object} sortDirection
   * @param {Array} tableData
   * @return {Array}
   */
  sortData = (sortBy: string, sortDirection: 'ASC' | 'DESC', tableData: Array<Object>) => {
    const sort = sortBy || 'dueDate';

    if (!tableData.length) {
      return [];
    }

    // eslint-disable-next-line react/no-unused-state
    this.setState({ sortDirection });

    // $FlowFixMe: why does flow think that Immutable.sortBy doesn't exist?
    const data = fromJS(tableData)
      .sortBy(obj => obj.get(sort))
      .toJS();
    return sortDirection === SortDirection.DESC ? data.reverse() : data;
  };

  // change sortedData to state variable. run this function in componentDidMount
  sortedData = this.sortData(this.props.sortBy, this.props.sortDirection, this.props.tableData);

  /**
   * Customize Row style and event handlers
   * - the props passed to the rowRenderer function used by RV Table
   * - any prop we need to consume in our custom row
   * @param {Props} props
   * @return {React$Node}
   */
  rowRenderer = (props: Props) => {
    const {
      onRowMouseOver,
      onRowMouseLeave,
      activeRow,
      displayDropdown,
      onRowClick,
      tableData,
    } = this.props;
    const customStyle = props.style && {
      position: props.style.position,
      top: props.style.top,
      left: 5,
      height: props.style.height,
      width: props.style.width - 10,
      overflow: props.style.overflow,
    };

    return (
      <Row
        {...props}
        style={customStyle}
        _key={props.key}
        onRowMouseOver={onRowMouseOver}
        onRowMouseLeave={onRowMouseLeave}
        activeRow={activeRow}
        displayDropdown={displayDropdown}
        onRowClick={onRowClick}
      >
        {props.index && tableData[props.index].columns}
      </Row>
    );
  };

  /**
   * if optional loading prop is true
   * do not display content supplied by
   * noTableData function.
   * @return {React$Node}
   */
  onNoTableData = () => {
    const { loading, noTableData } = this.props;
    if (loading) {
      return;
    }
    if (noTableData) {
      return noTableData();
    }
  };

  /**
   * Render a custom header for the TableBody.
   * Handles coloumn label, tooltips and Draggable component
   * @param {Object} table data
   * @return {React$Node}
   */
  headerRenderer = ({ columnData, dataKey, disableSort, label, sortBy, sortDirection }: Object) => {
    return (
      <React.Fragment key={dataKey}>
        <TableHeader
          disableSort={disableSort}
          onClick={() => !disableSort && this.props.onSortChange(dataKey, sortDirection)}
          className="ReactVirtualized__Table__headerTruncatedText"
        >
          {columnData && columnData.hasOwnProperty('tooltip') ? (
            <Tooltip id={columnData.tooltip.id} value={columnData.tooltip.value} place="bottom">
              {this.manageLabel(label, sortBy, dataKey, sortDirection)}
            </Tooltip>
          ) : (
            <>{this.manageLabel(label, sortBy, dataKey, sortDirection)}</>
          )}
        </TableHeader>
        {this.props.draggable && (
          <Draggable
            axis="x"
            defaultClassName="DragHandle"
            defaultClassNameDragging="DragHandleActive"
            onDrag={(event, { deltaX }) =>
              this.resizeRow({
                dataKey,
                deltaX,
              })
            }
            position={{ x: 0 }}
            zIndex={999}
          >
            <DragHandle>
              <OptionsIcon />
            </DragHandle>
          </Draggable>
        )}
      </React.Fragment>
    );
  };

  /**
   * Save new widths to state and track which rows have been customized
   * @param {Object} - dataKey: column being resized; deltaX - change in width
   */
  resizeRow = ({ dataKey, deltaX }: Object) => {
    this.setState(prevState => {
      const prevWidths = prevState.widths;
      const percentDelta = deltaX / this.TOTAL_WIDTH;
      // eslint-disable-next-line react/no-access-state-in-setstate
      const rows = this.state.customRows.slice();

      if (!rows.includes(dataKey)) {
        rows.push(dataKey);
      }

      return {
        widths: {
          ...prevWidths,
          [dataKey]: prevWidths[dataKey] + percentDelta,
        },
        customRows: rows,
      };
    });
  };

  /**
   * Render a cusom label to display proper sort icon
   * @param {string} label
   * @param {string} sortBy
   * @param {string} dataKey
   * @param {string} sortDirection
   * @return {React$Node}
   */
  manageLabel = (label: string, sortBy: string, dataKey: string, sortDirection: string) => {
    if (sortBy === dataKey) {
      return (
        <>
          {label} {sortDirection === 'ASC' ? <UpIcon /> : <DownIcon />}
        </>
      );
    }
    return label;
  };

  /**
   * Filter columns based on local storage object.
   * Local storage object created in the OptionsModal component.
   * If this object has not been set, render default columns from table props.
   * If no default columns provided, render them all.
   * @param {string} dataKey
   * @return {React$Node}
   */
  filterColumns = (dataKey: string) => {
    const localStorageObject = `${this.props.name}Columns`;
    const { defaultColumns } = this.props;

    if (localStorage.hasOwnProperty(localStorageObject)) {
      const savedColumns = localStorage.getItem(localStorageObject);
      const columns = savedColumns && JSON.parse(savedColumns);

      if (columns && typeof columns === 'object') {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in columns) {
          if (key === dataKey && columns[key]) {
            return dataKey;
          }
        }
      }
    } else if (defaultColumns) {
      if (defaultColumns.includes(dataKey)) {
        return dataKey;
      }
    } else {
      return dataKey;
    }
  };

  /**
   * Render TableBody component
   * @return {React$Node}
   */
  render() {
    const { widths, customRows } = this.state;
    const {
      name,
      isRowLoaded,
      onLoadMore,
      remoteRowCount,
      disableHeader,
      tableData,
      APISort,
      sortBy,
      sortDirection,
      onSortChange,
      columnProps,
      defaultColumns,
      customizeColumnButtonType,
    } = this.props;

    let customizeColumnButton = <SettingsIcon />;
    let SettingsWrapper = SettingsWrapperWhenIcon;
    if (customizeColumnButtonType === 'text') {
      SettingsWrapper = SettingsWrapperWhenText;
      customizeColumnButton = (
        <CustomizeColumnsButton theme="filter" size="xs" type="button">
          <SettingsButtonTextWrapper>Customize</SettingsButtonTextWrapper>
        </CustomizeColumnsButton>
      );
    }

    return (
      <TableWrapper>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={onLoadMore}
          rowCount={remoteRowCount}
          threshold={5}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <Table
                    name={name}
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    width={width}
                    height={height}
                    rowHeight={this.props.rowHeight ? this.props.rowHeight : 92}
                    headerHeight={53}
                    disableHeader={disableHeader}
                    rowCount={tableData.length}
                    rowGetter={({ index }) => (APISort ? tableData[index] : this.sortedData[index])}
                    rowRenderer={this.rowRenderer}
                    noRowsRenderer={this.onNoTableData}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    sort={event => !APISort && onSortChange(event.sortBy, sortDirection, tableData)}
                    className="uk-table"
                    headerClassName="uk-table-header"
                    gridClassName="uk-table-grid"
                    rowClassName="uk-table-row"
                  >
                    {(() => {
                      return columnProps
                        .map(col => {
                          return (
                            <Column
                              {...col}
                              key={`column-${col.dataKey}`}
                              headerClassName={col.className}
                              headerRenderer={
                                col.headerRenderer ? col.headerRenderer : this.headerRenderer
                              }
                              width={
                                customRows.includes(col.dataKey) ||
                                this.localStorageObject().storage
                                  ? widths[col.dataKey] * width
                                  : col.width
                              }
                            />
                          );
                        })
                        .filter(col => this.filterColumns(col.props.dataKey));
                    })()}
                  </Table>
                );
              }}
            </AutoSizer>
          )}
        </InfiniteLoader>
        <SettingsWrapper
          onClick={() => Actions.modal(OptionsModal, { columnProps, defaultColumns, name })}
        >
          <Tooltip id="select-column-tooltip" value="Show/Hide Columns">
            {customizeColumnButton}
          </Tooltip>
        </SettingsWrapper>
      </TableWrapper>
    );
  }
}

export default withErrorBoundary(TableBody, () => <PageError name="Work Order list" />);
