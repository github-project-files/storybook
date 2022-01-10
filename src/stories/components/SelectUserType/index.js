// @flow
import React, { PureComponent } from 'react';
import Select from 'components/Select';
import { USER_ROLES } from 'constants/userRoles';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
  defaultValue?: string,
  [key: string]: any,
};

/**
 * return supported user types
 * @return {Array<Object>}
 */
function getUserTypes() {
  return [
    {
      label: 'Administrator',
      value: USER_ROLES.ADMIN,
    },
    {
      label: 'Technician',
      value: USER_ROLES.TECH,
    },
    {
      label: 'Limited Technician',
      value: USER_ROLES.LIMITED_TECH,
    },
    {
      label: 'View Only',
      value: USER_ROLES.VIEW_ONLY,
    },
    {
      label: 'Requester',
      value: USER_ROLES.REQUESTER,
    },
  ];
}

class SelectUserType extends PureComponent<$FlowLintFix> {
  /**
   * Render an PageHeader
   * @return {React$Node}
   */
  render() {
    const menuData = getUserTypes();
    if (this.props.defaultValue) {
      return (
        <Select
          {...this.props}
          defaultValue={menuData.filter(e => e.value === this.props.defaultValue)}
          error={this.props.error}
          fieldType="select"
          options={menuData}
        />
      );
    }
    return (
      <Select {...this.props} error={this.props.error} fieldType="select" options={menuData} />
    );
  }
}

export default SelectUserType;
