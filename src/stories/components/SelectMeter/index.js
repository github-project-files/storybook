// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';
import { pure } from 'utils/hocs';

import { getMetersRestrictionsLevel } from 'utils';
import withSession from 'hocs/withSession';

import METERS_QUERY from 'gql/queries/Meters.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
  locationId?: string,
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
  return records.map(a => ({
    label: a.name,
    value: a.id,
  }));
}

class SelectMeter extends PureComponent<$FlowLintFix, State> {
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
            query={METERS_QUERY}
            variables={{
              limit: 1000,
              search: this.state.search,
              location: this.props.locationId || undefined,
              restrictionsLevel: getMetersRestrictionsLevel(this.props.session),
            }}
          >
            {({ loading, data }) => {
              const meters = massageData(data.meters || []);
              const menuData = this.props.additionalSelect
                ? meters.concat([this.props.additionalSelect])
                : meters;
              if (this.props.raw) {
                return (
                  <Select
                    clearable
                    placeholder={t('generic.selectMeter')}
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
              return (
                <FormField
                  clearable
                  placeholder={t('generic.selectMeter')}
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

export default withSession(pure(SelectMeter));
