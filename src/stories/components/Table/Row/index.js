// @flow
// separate ticket for flow & deps upgrade
// https://upkeep.atlassian.net/browse/UPK-1303
// $FlowFixMe: upgrade flow version to 0.114.0 triggers a chain of upgrades
import React, { useState, useCallback } from 'react';
import { withErrorBoundary } from 'utils/hocs';
import SidebarCardError from 'components/ErrorComponent/SidebarCard';
import { colors, statusColors } from 'utils/StyleGuide';
import { RowWrapper } from './styled';

type Props = {
  className?: string,
  columns?: Array<Object>,
  // eslint-disable-next-line react/no-unused-prop-types
  index?: number,
  style: Object,
  _key: string | number,
  rowData?: Object,
  onRowMouseOver: Function,
  onRowMouseLeave: Function,
  displayDropdown: boolean,
  onRowClick: Function,
};

const backgroundColor = (row) => {
  // FIXME: decouple row data and colors
  // --_(-_-)_--
  if (row && row.status) {
    return statusColors.background[row.status];
  }

  if (row && row.isArchived) {
    return colors.alabaster;
  }

  return colors.white;
}

/**
 * Render Tablerow component
 * @param {Object} props
 * @return {React$Node}
 */
const TableRow = (props: Props) => {
  const {
    className,
    style,
    _key,
    rowData,
    onRowMouseOver,
    onRowMouseLeave,
    columns,
    displayDropdown,
    onRowClick,
  } = props;

  const [active, setActive]: [boolean, (boolean) => any] = useState(false);

  const handleMouseOver = useCallback(() => {
    if (!active) {
      onRowMouseOver(rowData);
      setActive(true);
    }
  }, [active, rowData]);

  const handleMouseLeave = useCallback(() => {
    if (active) {
      onRowMouseLeave(rowData);
      setActive(false);
    }
  }, [active, rowData]);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <RowWrapper
      className={className}
      style={style}
      key={_key}
      background={backgroundColor(rowData)}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      active={active && displayDropdown}
      onClick={event => onRowClick(rowData, event)}
    >
      {columns}
    </RowWrapper>
  );
};

export default withErrorBoundary(TableRow, () => <SidebarCardError name="Work order item" />);
