// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';
import { pure } from 'utils/hocs';
import withSession from 'hocs/withSession';
import { getAssetsRestrictionsLevel } from 'utils';
import type { Session } from 'types';
import ASSETS_QUERY from 'gql/queries/Assets.graphql';

import FormGroup from 'components/HookForm/FormGroup';
import Label from 'components/HookForm/Label';
import ErrorMessage from 'components/HookForm/ErrorMessage';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  raw?: boolean,
  locationId?: string,
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
  return records.map(a => ({
    label: a.name,
    value: a.id,
  }));
}

class SelectAsset extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: this.props.initialSearch || '',
  };

  handleKeyDown = () => {
    // this.setState({ search: event.value });
  };

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
            query={ASSETS_QUERY}
            variables={{
              limit: 1000,
              search: this.state.search,
              location: this.props.locationId || undefined,
              restrictionsLevel: getAssetsRestrictionsLevel(this.props.session),
            }}
          >
            {({ loading, data }) => {
              const assets = massageData(data.assets || []);
              const menuData = this.props.additionalSelect
                ? assets.concat([this.props.additionalSelect])
                : assets;
              if (this.props.raw) {
                return (
                  <Select
                    clearable
                    placeholder={t('generic.selectAsset')}
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
                      placeholder={t('generic.selectAsset')}
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
                  placeholder={t('generic.selectAsset')}
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

export default withSession(pure(SelectAsset));
