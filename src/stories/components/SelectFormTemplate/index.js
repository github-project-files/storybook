// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';

import FORM_TEMPLATES_QUERY from 'gql/queries/FormTemplates.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
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

class SelectFormTemplate extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: this.props.initialSearch || '',
  };

  handleKeyDown = () => {};

  handleInputChange = (value: string) => {
    if (!value) {
      return;
    }

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
            query={FORM_TEMPLATES_QUERY}
            variables={{
              limit: 250,
              search: this.state.search,
            }}
          >
            {({ loading, data }) => {
              if (this.props.raw) {
                return (
                  <Select
                    clearable
                    placeholder={t('generic.selectFormTemplate')}
                    {...this.props}
                    error={this.props.error}
                    fieldType="select"
                    options={massageData(data.formTemplates || [])}
                    isLoading={loading}
                    onKeyDown={this.handleKeyDown}
                    onInputChange={this.handleInputChange}
                  />
                );
              }
              return (
                <FormField
                  clearable
                  placeholder={t('generic.selectFormTemplate')}
                  {...this.props}
                  error={this.props.error}
                  fieldType="select"
                  options={massageData(data.formTemplates || [])}
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

export default SelectFormTemplate;
