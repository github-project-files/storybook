// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';
import { pure } from 'utils/hocs';
import type { Session } from 'types';
import withSession from 'hocs/withSession';
import LOCATIONS_QUERY from 'gql/queries/Locations.graphql';
import { getLocationsRestrictionsLevel } from 'utils';

import FormGroup from 'components/HookForm/FormGroup';
import Label from 'components/HookForm/Label';
import ErrorMessage from 'components/HookForm/ErrorMessage';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
  session: Session,
  additionalSelect?: { label: string, value: string },
  [key: string]: any,
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
  return records.map(a => {
    let label = a.name;
    if (a.address) {
      label += ` - ${a.address}`;
    }
    if (Array.isArray(a.subLocations) && a.subLocations.length) {
      const { name } = a.subLocations[0];
      const count = a.subLocations.length - 1;
      label += a.subLocations.length > 1 ? ` - ${name} + ${count} more` : ` - ${name}`;
    }
    return {
      label,
      value: a.id,
    };
  });
}

class SelectLocation extends PureComponent<$FlowLintFix, State> {
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
    return (
      <I18n ns="translations">
        {t => (
          <Query
            query={LOCATIONS_QUERY}
            variables={{
              limit: 1000,
              search: this.state.search,
              sort: 'stringName ASC',
              restrictionsLevel: getLocationsRestrictionsLevel(this.props.session),
            }}
          >
            {({ loading, data }) => {
              const locations = massageData(data.locations || []);
              const menuData = this.props.additionalSelect
                ? locations.concat([this.props.additionalSelect])
                : locations;

              if (this.props.raw) {
                return (
                  <Select
                    clearable
                    placeholder={t('generic.selectLocation')}
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
                      placeholder={t('generic.selectLocation')}
                      {...this.props}
                      error={this.props.error}
                      fieldType="select"
                      options={menuData}
                      isLoading={loading}
                      onKeyDown={this.handleKeyDown}
                      onInputChange={this.handleInputChange}
                    />
                    {ifError && <ErrorMessage error={this.props.error.message} />}
                  </FormGroup>
                );
              }
              return (
                <FormField
                  clearable
                  placeholder={t('generic.selectLocation')}
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
    );
  }
}

export default withSession(pure(SelectLocation));
