// @flow

import React from 'react';
import Button from 'components/Button';
import SearchBar from 'components/SearchBar';
import CheckBox from 'components/Checkbox';
import DropdownMenu from 'components/DropdownMenu';
import { generateUserName, manageFilterTheme } from 'utils';
import { Query } from 'react-apollo';
import USERS_QUERY from 'gql/queries/Users.graphql';
import { USER_ROLES } from 'constants/userRoles';
import { CheckBoxWrapper, SearchUsersWrapper, SearchUsersCover, EmptyResults } from './styled';

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
  excludeUserIds?: Array<string | number>,
  excludeUserTypes?: Array<string>,
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
  enableSupportUserFilter?: boolean,
  searchInAdditionalWorker?: boolean,
};

const accountTypeLabel = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.TECH]: 'Technical',
  [USER_ROLES.VIEW_ONLY]: 'View Only',
  [USER_ROLES.REQUESTER]: 'Requester',
  [USER_ROLES.LIMITED_TECH]: 'Limited Technical',
  // user type 6 is stored as Vendor in mysql, can be either vendor or customer
  [USER_ROLES.VENDOR]: 'Vendor/Customer',
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
    excludeUserIds,
    excludeUserTypes,
    direction,
    offsetX,
    onMouseLeave,
    enableSupportUserFilter,
    searchInAdditionalWorker,
  } = props;

  /**
   * Massage data to be DropdownMenu & AssigneeGroup friendly
   * @param {Object} records
   * @param {Array<string | number>} excludeUserIds
   * @param {Array<number>} excludeUserTypes
   * @return {Array<Object>}
   */
  const massageData = (
    records: Object,
    // eslint-disable-next-line no-shadow
    excludeUserIds?: Array<string | number> = [],
    // eslint-disable-next-line no-shadow
    excludeUserTypes?: Array<string> = [],
  ) => {
    const key = 'assignedTo';
    return records
      .filter(a => {
        // filter out specified users
        const valid =
          excludeUserIds.indexOf(a.id.toString()) < 0 &&
          excludeUserTypes.indexOf(a.accountType) < 0;
        return valid;
      })
      .map(data => {
        return {
          label: `${generateUserName(data)} (${accountTypeLabel[data.accountType]})`,
          handleOnClick: () => onSelectionClick(key, data),
          id: data.id,
          key,
          assignedTo: [
            {
              firstName: data.firstName,
              lastName: data.lastName,
              avatar: data.avatar,
              email: data.email,
              id: data.id,
            },
          ],
        };
      })
      .concat([
        {
          label: 'No Assignee(s)',
          handleOnClick: () => onSelectionClick(key, { id: 'notAssigned', name: 'No Assignee(s)' }),
          id: 'notAssigned',
          key,
          assignedTo: [
            {
              firstName: 'N',
              lastName: 'A',
              avatar: null,
              id: 'noAssignee',
            },
          ],
        },
      ]);
  };
  /**
   * Render search bar if account has users,
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
            No users.&nbsp;
            <a href="/web/people">Create a new user here.</a>
          </EmptyResults>
        )}
        {enableSupportUserFilter && (
          <CheckBoxWrapper>
            <CheckBox
              label="Search Additional Workers"
              onClick={() =>
                onSelectionClick('searchPrimaryInSupportUsers', !searchInAdditionalWorker)
              }
              checked={searchInAdditionalWorker}
            />
          </CheckBoxWrapper>
        )}
      </>
    );
  };

  return (
    <SearchUsersWrapper onMouseLeave={onMouseLeave}>
      <SearchUsersCover height={isOpen ? maxHeight : 0} />
      <Query query={USERS_QUERY} variables={{ limit: 500, search: value }}>
        {({ loading, error, data }) => {
          return (
            <span>
              <DropdownMenu
                header={renderHeader(data.users || [])}
                width={width}
                maxHeight={maxHeight}
                display={isOpen}
                menuItems={massageData(data.users || [], excludeUserIds, excludeUserTypes)}
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
          );
        }}
      </Query>
    </SearchUsersWrapper>
  );
};
