// @flow

import React from 'react';
import Button from 'components/Button';
// import SearchBar from 'components/SearchBar';
import DropdownMenu from 'components/DropdownMenu';
import { manageFilterTheme } from 'utils';
import { Query } from 'react-apollo';
import ADDITIONAL_COST_CATEGORY from 'gql/queries/WorkOrderCostCategory.graphql';
import { CostCategoryWrapper, SearchCategory } from './styled';

type Props = {
  handleToggle: Function,
  isOpen: boolean,
  children: React$Node,
  // eslint-disable-next-line react/no-unused-prop-types
  value: string,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: Function,
  selection: Array<string>,
  onSelectionClick: Function,
  width?: string,
  maxHeight?: string,
  direction?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right',
  offsetX?: string,
  onMouseLeave: Function,
};

export default (props: Props) => {
  const {
    handleToggle,
    isOpen,
    children,
    // value,
    // onChange,
    selection,
    onSelectionClick,
    width,
    maxHeight,
    direction,
    offsetX,
    onMouseLeave,
  } = props;

  /**
   * data for dropdown
   * @param {Object} records
   * @return {Array<Object>}
   */
  const messageData = (records: Object) => {
    const key = 'costCategories';
    return records.map(data => {
      return {
        label: data.name,
        handleOnClick: () => onSelectionClick(key, data),
        id: data.id,
        key,
      };
    });
  };

  /**
   * Render search bar
   * @return {React$Node}
   */
  // const renderHeader = () => {
  //   return (
  //     <React.Fragment>
  //       <SearchBar
  //         size="sm"
  //         onClick={event => event.stopPropagation()}
  //         onSearchChange={onChange}
  //         value={value}
  //       />
  //     </React.Fragment>
  //   );
  // };

  return (
    <CostCategoryWrapper onMouseLeave={onMouseLeave}>
      <SearchCategory height={isOpen ? maxHeight : 0} />
      <Query query={ADDITIONAL_COST_CATEGORY}>
        {({ loading, error, data }) => {
          return (
            !loading && (
              <span>
                <DropdownMenu
                  // header={renderHeader()}
                  width={width}
                  maxHeight={maxHeight}
                  display={isOpen}
                  menuItems={messageData(data.workOrderCostCategories)}
                  selection={selection}
                  persistentIcon
                  direction={direction}
                  offsetX={offsetX}
                  isLoading={loading}
                  error={error}
                  listItemWrap
                >
                  <Button
                    theme={manageFilterTheme(isOpen, selection)}
                    thin
                    size="xs"
                    onClick={() => handleToggle('displayAssigneeFilter')}
                  >
                    {children}
                  </Button>
                </DropdownMenu>
              </span>
            )
          );
        }}
      </Query>
    </CostCategoryWrapper>
  );
};
