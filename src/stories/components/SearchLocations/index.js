// @flow

import React from 'react';
import Button from 'components/Button';
import SearchBar from 'components/SearchBar';
import DropdownMenu from 'components/DropdownMenu';
import { manageFilterTheme, getLocationsRestrictionsLevel } from 'utils';
import { Query } from 'react-apollo';
import LOCATIONS_QUERY from 'gql/queries/Locations.graphql';
import type { Session } from 'types';
import { SearchLocationsWrapper, SearchLocationsCover, EmptyResults } from './styled';

type Props = {
  handleToggle: Function,
  isOpen: boolean,
  children: React$Node,
  value: string,
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
  session: Session,
};

export default (props: Props) => {
  const {
    handleToggle,
    isOpen,
    children,
    value,
    onChange,
    selection,
    onSelectionClick,
    width,
    maxHeight,
    direction,
    offsetX,
    onMouseLeave,
    session,
  } = props;

  /**
   * Massage data to be DropdownMenu friendly
   * @param {Object} records
   * @return {Array<Object>}
   */
  const messageData = (records: Object) => {
    const key = 'location';
    const allLocation = Array.from(records);

    records.forEach(item => {
      if (item.subLocations && item.subLocations.length) {
        item.subLocations.forEach(loc => {
          allLocation.forEach((subLoc, index) => {
            if (loc.id === subLoc.id) {
              allLocation.splice(index, 1);
            }
          });
        });
      }
    });

    const dropdownItem = [];
    for (let i = 0; i < allLocation.length; i += 1) {
      dropdownItem.push({
        label: allLocation[i].name,
        handleOnClick: () => onSelectionClick(key, allLocation[i]),
        id: allLocation[i].id,
        key,
      });
      if (allLocation[i].subLocations && allLocation[i].subLocations.length) {
        for (let j = 0; j < allLocation[i].subLocations.length; j += 1) {
          dropdownItem.push({
            label: allLocation[i].subLocations[j].name,
            nested: true,
            handleOnClick: () => onSelectionClick(key, allLocation[i].subLocations[j]),
            id: allLocation[i].subLocations[j].id,
            key,
          });
        }
      }
    }

    return dropdownItem.concat([
      {
        label: 'No Location',
        handleOnClick: () => onSelectionClick(key, { id: 'notAssigned', name: 'No Location' }),
        id: 'notAssigned',
        key,
      },
    ]);
  };

  /**
   * Render search bar if account has locations,
   * otherwise display message with link
   * @param {Object} records
   * @return {React$Node}
   */
  const renderHeader = (records: Object) => {
    return (
      <>
        <SearchBar
          size="sm"
          onClick={event => event.stopPropagation()}
          onSearchChange={onChange}
          value={value}
        />
        {!records.length && (
          <EmptyResults>
            No locations.&nbsp;
            <a href="/#/app/location">Create a new location here.</a>
          </EmptyResults>
        )}
      </>
    );
  };

  return (
    <SearchLocationsWrapper onMouseLeave={onMouseLeave}>
      <SearchLocationsCover height={maxHeight} />
      <Query
        query={LOCATIONS_QUERY}
        variables={{
          search: value,
          limit: 1000,
          sort: 'stringName ASC',
          showSublocations: false,
          includes: ['subLocations'],
          restrictionsLevel: getLocationsRestrictionsLevel(session),
        }}
      >
        {({ loading, error, data }) => {
          return (
            <span>
              <DropdownMenu
                header={renderHeader((data && data.locations) || [])}
                width={width}
                maxHeight={maxHeight}
                display={isOpen}
                menuItems={messageData((data && data.locations) || [])}
                selection={selection}
                persistentIcon
                direction={direction}
                offsetX={offsetX}
                isLoading={loading}
                error={error}
              >
                <Button
                  theme={manageFilterTheme(isOpen, selection)}
                  thin
                  size="xs"
                  onClick={() => handleToggle('displayLocationFilter')}
                >
                  {children}
                </Button>
              </DropdownMenu>
            </span>
          );
        }}
      </Query>
    </SearchLocationsWrapper>
  );
};
