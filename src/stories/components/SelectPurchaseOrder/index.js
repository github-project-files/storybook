// @flow

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query } from 'react-apollo';
import { FormField } from 'components/Forms';
import Select from 'components/Select';
import { withErrorBoundary, pure } from 'utils/hocs';

import PURCHASE_ORDERS_QUERY from 'gql/queries/PurchaseOrders.graphql';
import SidebarError from 'components/ErrorComponent/SidebarCard';

import FormGroup from 'components/HookForm/FormGroup';
import Label from 'components/HookForm/Label';
import ErrorMessage from 'components/HookForm/ErrorMessage';

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
    label: a.title + (a.number ? ` (${a.number})` : ''),
    value: a.id,
  }));
}

class SelectPurchaseOrder extends PureComponent<$FlowLintFix, State> {
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
            query={PURCHASE_ORDERS_QUERY}
            variables={{
              limit: 1000,
              search: this.state.search,
            }}
          >
            {({ loading, data }) => {
              if (this.props.raw) {
                return (
                  <Select
                    clearable
                    placeholder={t('generic.selectPurchaseOrder')}
                    {...this.props}
                    error={this.props.error}
                    fieldType="select"
                    options={massageData(data.purchaseOrders || [])}
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
                      placeholder={t('generic.selectPurchaseOrder')}
                      {...this.props}
                      error={this.props.error}
                      fieldType="select"
                      options={massageData(data.purchaseOrders || [])}
                      isLoading={loading}
                      onKeyDown={this.handleKeyDown}
                      onInputChange={this.handleInputChange}
                      isMulti
                    />
                    {ifError && <ErrorMessage error={this.props.error.message} />}
                  </FormGroup>
                );
              }
              return (
                <FormField
                  clearable
                  placeholder={t('generic.selectPurchaseOrder')}
                  {...this.props}
                  error={this.props.error}
                  fieldType="select"
                  options={massageData(data.purchaseOrders || [])}
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

export default withErrorBoundary(pure(SelectPurchaseOrder), () => (
  <SidebarError name="Purchase Orders" />
));
