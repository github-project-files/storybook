// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';

import FILES_QUERY from 'gql/queries/Files.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  excludeUserIds?: Array<string | number>,
  excludeUserTypes?: Array<string>,
  raw?: boolean,
  additionalSelect?: { label: string, value: string },
  [key: string]: any,
};

type State = {
  search: string,
};

/**
 * Massage records to be ReactSelect-friendly
 * @param {Array<Object>} records
 * @param {Array<string | number>} excludeUserIds
 * @param {Array<number>} excludeUserTypes
 * @return {Array<Object>}
 */
function massageData(
  records,
  excludeUserIds?: Array<string | number> = [],
  excludeUserTypes?: Array<string> = [],
) {
  return records
    .filter(a => {
      // filter out specified users
      const valid =
        excludeUserIds.indexOf(a.id.toString()) < 0 && excludeUserTypes.indexOf(a.accountType) < 0;
      return valid;
    })
    .map(file => {
      return { label: file.originalName, value: file.id };
    });
}

class SelectFile extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: this.props.initialSearch || '',
  };

  handleInputChange = (value: string) => {
    this.setState({ search: value });
  };

  /**
   * Render SelectFile Component.
   * @return {React$Node}
   */
  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Query
            query={FILES_QUERY}
            variables={{
              limit: 500,
              search: this.state.search,
            }}
          >
            {({ loading, data }) => {
              const files = massageData(
                data.files || [],
                this.props.excludeUserIds,
                this.props.excludeUserTypes,
              );
              const menuData = this.props.additionalSelect
                ? files.concat([this.props.additionalSelect])
                : files;

              if (this.props.raw) {
                return (
                  <Select
                    clearable
                    fieldType="select"
                    placeholder={t('generic.selectFile')}
                    {...this.props}
                    options={menuData}
                    isLoading={loading}
                    onInputChange={this.handleInputChange}
                    error={this.props.error}
                  />
                );
              }
              return (
                <FormField
                  clearable
                  fieldType="select"
                  placeholder={t('generic.selectFile')}
                  {...this.props}
                  options={menuData}
                  isLoading={loading}
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

export default SelectFile;
