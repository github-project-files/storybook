// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';
import { pure, withErrorBoundary } from 'utils/hocs';

import FormGroup from 'components/HookForm/FormGroup';
import Label from 'components/HookForm/Label';
import ErrorMessage from 'components/HookForm/ErrorMessage';

import SidebarError from 'components/ErrorComponent/SidebarCard';
import TEAMS_QUERY from './Teams.graphql';

import { SelectWrapper, OptionWrapper } from './styled';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
  additionalSelect?: { label: string, value: string },
  [key: string]: any,
  withHookForm?: boolean,
  required?: boolean,
};

type State = {
  search: string,
};

/**
 * Massage records to be ReactSelect-friendly
 * @param {Array<Object>} records
 * @return {Array<Object>}
 */
function massageData(records) {
  return records.map(a => ({
    label: a.name,
    value: a.id,
    totalUsers: a.totalUsers,
  }));
}

class SelectTeam extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: this.props.initialSearch || '',
  };

  handleKeyDown = () => {};

  handleInputChange = (value: string) => {
    this.setState({ search: value });
  };

  /**
   * Render an PageHeader
   * @return {React$Node}
   */
  render() {
    const formatOptionLabel = ({ label, totalUsers }) => {
      return (
        <OptionWrapper>
          <p className="label">{label}</p>
          <p className="total-users">
            {totalUsers}
            {totalUsers === 1 ? ' person' : ' people'}
          </p>
        </OptionWrapper>
      );
    };
    return (
      <SelectWrapper>
        <I18n ns="translations">
          {t => (
            <Query
              query={TEAMS_QUERY}
              variables={{
                limit: 250,
                search: this.state.search,
              }}
            >
              {({ loading, data }) => {
                const teams = massageData(data.teams || []);
                const menuData = this.props.additionalSelect
                  ? teams.concat([this.props.additionalSelect])
                  : teams;
                if (this.props.raw) {
                  return (
                    <Select
                      clearable
                      placeholder={t('generic.selectTeam')}
                      {...this.props}
                      error={this.props.error}
                      fieldType="select"
                      options={menuData}
                      isLoading={loading}
                      onKeyDown={this.handleKeyDown}
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
                        placeholder={t('generic.selectTeam')}
                        {...this.props}
                        error={this.props.error}
                        fieldType="select"
                        options={menuData}
                        isLoading={loading}
                        onKeyDown={this.handleKeyDown}
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
                    placeholder={t('generic.selectTeam')}
                    {...this.props}
                    error={this.props.error}
                    fieldType="select"
                    options={menuData}
                    isLoading={loading}
                    onKeyDown={this.handleKeyDown}
                    onInputChange={this.handleInputChange}
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

export default withErrorBoundary(pure(SelectTeam), () => <SidebarError name="Teams" />);
