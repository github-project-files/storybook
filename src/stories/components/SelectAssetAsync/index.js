// @flow
/* eslint-disable require-jsdoc */

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query, ApolloConsumer } from 'react-apollo';
import AsyncPaginate from 'react-select-async-paginate';
import { Field } from 'formik';
import { pure, withErrorBoundary } from 'utils/hocs';
import SidebarError from 'components/ErrorComponent/SidebarCard';
import RequiredAsterisk from 'components/RequiredAsterisk';
import { getAssetsRestrictionsLevel } from 'utils';
import withSession from 'hocs/withSession';
import { Label, Error, Wrapper, OptionWrapper, FormikFieldWrapper } from './styled';

import QUERY from './Assets.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  locationId?: string,
  [key: string]: any,
};

type State = {
  search: string,
};

const DEFAULT_LIMIT = 20;

// the query client for QUERY
let queryCLient = {};

// option being handled in previous
// select components :/
// this option gets pushed in the array at the beggining
// to give the option in multi select filters to select
// all the items where no such entity is attached
// to get the flow - search noSelect
const addnOption = {
  id: 'notAssigned',
  name: 'No Asset Assigned',
};

const Option = ({
  innerProps,
  innerRef,
  data,
  label,
  isFocused,
  isSelected,
  selectProps: { classNamePrefix },
}: Object) => {
  return (
    <OptionWrapper
      className={`
      ${classNamePrefix}__option
      ${classNamePrefix}__option${isFocused ? '--is-focused' : ''}
      ${classNamePrefix}__option${isSelected ? '--is-selected' : ''}
    `}
      ref={innerRef}
      {...innerProps}
    >
      <p>{label}</p>
      {data.barcode && <p>{data.barcode}</p>}
    </OptionWrapper>
  );
};

class AssetDropdown extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: '',
  };

  handleInputChange = (value: string) => {
    this.setState({ search: value });
  };

  /**
   * Determine the position of scroll at which the list should request for more data
   * @param {string} scrollHeight
   * @param {string} clientHeight
   * @param {string} scrollTop
   * @return {boolean}
   */
  shouldLoadMore = (scrollHeight, clientHeight, scrollTop) => {
    const bottomBorder = (scrollHeight - clientHeight) / 1.2;
    return bottomBorder < scrollTop;
  };

  /**
   * Loading options for the <AsyncPaginate> select component
   * @param {string} search
   * @param {string} prevOptions
   * @return {Object}
   */
  loadOptions = async (search: string, prevOptions: any) => {
    let res = [];
    const query = {
      query: QUERY,
      variables: {
        limit: DEFAULT_LIMIT,
        search,
        location: this.props.locationId || undefined,
        offset: prevOptions.length,
        restrictionsLevel: getAssetsRestrictionsLevel(this.props.session),
      },
    };
    await queryCLient.query(query).then(({ data }) => {
      res = data.assets;
    });

    if (prevOptions.length > 0 && res.length < DEFAULT_LIMIT) {
      return {
        options: res,
        hasMore: false,
      };
    }

    return {
      options: res,
      hasMore: true,
    };
  };

  render() {
    const { search } = this.state;
    const { required, error } = this.props;
    return (
      <ApolloConsumer>
        {// eslint-disable-next-line no-return-assign
        client => (
          // eslint-disable-next-line no-sequences
          (queryCLient = client),
          (
            <Wrapper className={error ? 'error' : ''}>
              {this.props.label && (
                <Label>
                  {this.props.label} {required && <RequiredAsterisk />}
                </Label>
              )}
              <AsyncPaginate
                classNamePrefix="react-select"
                {...this.props}
                cacheUniq={this.props.locationId}
                loadOptions={this.loadOptions}
                inputValue={search}
                onInputChange={this.handleInputChange}
                components={{
                  Option,
                }}
                isClearable
                getOptionLabel={data => data.name}
                getOptionValue={data => data.id}
                shouldLoadMore={this.shouldLoadMore}
              />
              {this.props.error && <Error>{this.props.error}</Error>}
            </Wrapper>
          )
        )}
      </ApolloConsumer>
    );
  }
}

// try to remove this component once all the forms
// have been updated to deal with objects
// currently all the forms pass in the objectId in value
// & expect the objectId from the onChange
// ideally the form should get the object & serialize
// only the objectId to server
// make the component thinner, fast & more responsive by
// removing this component (added for backwards compatibility :/)
const DefaultValueQuery = ({ value, onChange, ...props }: Object) => {
  // eslint-disable-next-line no-shadow
  const handleOnChange = value => {
    if (value) {
      // eslint-disable-next-line no-param-reassign
      value = Array.isArray(value) ? value.map(v => v.id) : value.id;
    }

    if (onChange) {
      onChange(value);
    }
  };

  if (!value) {
    return <AssetDropdown {...props} value={undefined} onChange={handleOnChange} />;
  }

  if (Array.isArray(value) && typeof value[0] !== 'string') {
    return <AssetDropdown {...props} value={value} onChange={handleOnChange} />;
  }

  if (!Array.isArray(value) && typeof value !== 'string') {
    return <AssetDropdown {...props} value={value} onChange={handleOnChange} />;
  }

  // eslint-disable-next-line no-param-reassign
  value = Array.isArray(value) ? value : [value];

  let noSelect = false;
  const ids = [...value];
  if (ids.indexOf(addnOption.id) !== -1) {
    noSelect = true;

    // notAssigned is not a id in DB, and would error out :/
    ids.splice(ids.indexOf(addnOption.id), 1);
  }

  return (
    <Query
      query={QUERY}
      variables={{
        ids,
        restrictionsLevel: getAssetsRestrictionsLevel(props.session),
      }}
    >
      {({ data, loading }) => {
        const assets = noSelect ? [addnOption, ...(data.assets || [])] : data.assets;
        return (
          <AssetDropdown
            {...props}
            isLoading={props.loading || loading}
            value={assets}
            onChange={handleOnChange}
          />
        );
      }}
    </Query>
  );
};

const DefaultOptionsQuery = ({ noSelect, ...props }: Object) => {
  return (
    <Query
      query={QUERY}
      variables={{
        limit: DEFAULT_LIMIT,
        search: '',
        location: props.locationId || undefined,
        restrictionsLevel: getAssetsRestrictionsLevel(props.session),
      }}
    >
      {({ data }) => {
        const assets = noSelect ? [addnOption, ...(data.assets || [])] : data.assets;

        return (
          <I18n ns="translations">
            {t => (
              <DefaultValueQuery
                loading
                defaultOptions={assets}
                placeholder={t('generic.selectAsset')}
                {...props}
              />
            )}
          </I18n>
        );
      }}
    </Query>
  );
};

export const SelectAsset = withSession(pure(DefaultOptionsQuery));

const FormikInterface = ({
  field: { name, value },
  form: { setFieldValue, errors },
  multi,
  additionalSelect,
  disabled,
  ...props
}: Object) => {
  // eslint-disable-next-line no-shadow
  const onChange = value => {
    setFieldValue(name, value || '');
  };
  return (
    <DefaultOptionsQuery
      {...props}
      onChange={onChange}
      value={value}
      error={errors[name]}
      isMulti={multi}
      isDisabled={disabled}
      noSelect={Boolean(additionalSelect)}
    />
  );
};

// NOTE: We intentionally extract className so we don't
// accidentally pass it into <Field />
const SelectAssetAsync = ({ className, ...props }: *) => {
  return (
    <FormikFieldWrapper>
      <Field {...props} component={FormikInterface} />
    </FormikFieldWrapper>
  );
};

export const FormikField = withErrorBoundary(withSession(SelectAssetAsync), () => (
  <SidebarError name="Assets" />
));