// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';
import { pure, withErrorBoundary } from 'utils/hocs';
import { generateUserInitials, generateUserColor } from 'utils';

import USERS_QUERY from 'gql/queries/Users.graphql';
import SidebarError from 'components/ErrorComponent/SidebarCard';
import { USER_ROLES } from 'constants/userRoles';

import FormGroup from 'components/HookForm/FormGroup';
import Label from 'components/HookForm/Label';
import ErrorMessage from 'components/HookForm/ErrorMessage';

import { SelectWrapper, OptionWrapper, Avatar, UserInfo, Name, Type } from './styled';

const accountTypeLabel = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.TECH]: 'Technical',
  [USER_ROLES.VIEW_ONLY]: 'View Only',
  [USER_ROLES.REQUESTER]: 'Requester',
  [USER_ROLES.LIMITED_TECH]: 'Limited Technical',
  // user type 6 is stored as Vendor in mysql, can be either vendor or customer
  [USER_ROLES.VENDOR]: 'Vendor/Customer',
};

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: object,
  excludeUserIds?: Array<string | number>,
  excludeUserTypes?: Array<string>,
  raw?: boolean,
  selectedId?: Array<string>,
  additionalSelect?: { label: string, value: string },
  [key: string]: any,
  withHookForm?: boolean,
  label?: string,
  required?: boolean,
};

type State = {
  search: string,
};

/**
 * Massage records to be ReactSelect-friendly
 * @param {Array<Object>} records
 * @param {Array<string | number>} excludeUserIds
 * @param {Array<number>} excludeUserTypes
 * @param {Array<number>} selectedId
 * @return {Array<Object>}
 */
function massageData(
  records,
  excludeUserIds?: Array<string | number> = [],
  excludeUserTypes?: Array<string> = [],
  selectedId?: Array<string> = [],
) {
  let userList;
  if (selectedId && selectedId.length) {
    userList = records.filter(a => selectedId.indexOf(a.id) > -1);
  } else {
    userList = records;
  }
  return userList
    .filter(a => {
      // filter out specified users
      const valid =
        excludeUserIds.indexOf(a.id.toString()) < 0 && excludeUserTypes.indexOf(a.accountType) < 0;
      return valid;
    })
    .map(a => {
      let label = a.email;
      if (a.firstName || a.lastName) {
        label = '';
        if (a.firstName) {
          label += `${a.firstName} `;
        }

        if (a.lastName) {
          label += a.lastName;
        }
      }
      return {
        label,
        value: a.id,
        accountType: accountTypeLabel[a.accountType],
        avatar: a.avatar,
        firstName: a.firstName,
        lastName: a.lastName,
      };
    });
}

class SelectUser extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: this.props.initialSearch || '',
  };

  handleInputChange = (value: string) => {
    this.setState({ search: value });
  };

  /**
   * Render SelectUser Component.
   * @return {React$Node}
   */
  render() {
    const formatOptionLabel = ({ value, label, accountType, avatar, firstName, lastName }) => {
      const avatarColor = generateUserColor(value);
      const userInitials = generateUserInitials({
        firstName,
        lastName,
      });
      return (
        <OptionWrapper>
          <Avatar style={{ backgroundColor: avatarColor }}>
            {avatar && <img src={avatar} alt="Avatar" />}
            {!avatar && <span>{userInitials}</span>}
          </Avatar>
          <UserInfo>
            <Name>{label}</Name>
            <Type>{accountType}</Type>
          </UserInfo>
        </OptionWrapper>
      );
    };
    return (
      <SelectWrapper>
        <I18n ns="translations">
          {t => (
            <Query
              query={USERS_QUERY}
              variables={{
                limit: 500,
                search: this.state.search,
              }}
            >
              {({ loading, data }) => {
                const users = massageData(
                  data.users || [],
                  this.props.excludeUserIds,
                  this.props.excludeUserTypes,
                  this.props.selectedId,
                );
                const menuData = this.props.additionalSelect
                  ? users.concat([this.props.additionalSelect])
                  : users;
                if (this.props.raw) {
                  return (
                    <Select
                      clearable
                      placeholder={t('generic.selectUser')}
                      {...this.props}
                      error={this.props.error}
                      fieldType="select"
                      options={menuData}
                      isLoading={loading}
                      onInputChange={this.handleInputChange}
                    />
                  );
                }
                if (this.props.withHookForm) {
                  const ifError = !!(this.props.error && this.props.error.message);
                  return (
                    <FormGroup error={ifError}>
                      <Label label={this.props.label} required={this.props.required} />
                      <Select
                        clearable
                        placeholder={t('generic.selectUser')}
                        {...this.props}
                        error={ifError}
                        fieldType="select"
                        options={menuData}
                        isLoading={loading}
                        onInputChange={this.handleInputChange}
                        formatOptionLabel={formatOptionLabel}
                      />
                      {ifError && <ErrorMessage error={this.props.error.message} />}
                    </FormGroup>
                  );
                }
                return (
                  <FormField
                    clearable
                    fieldType="select"
                    placeholder={t('generic.selectUser')}
                    {...this.props}
                    options={menuData}
                    isLoading={loading}
                    onInputChange={this.handleInputChange}
                    formatOptionLabel={formatOptionLabel}
                  />
                );
              }}
            </Query>
          )}
        </I18n>
      </SelectWrapper>
    );
  }
}

export default withErrorBoundary(pure(SelectUser), () => <SidebarError name="Users" />);
