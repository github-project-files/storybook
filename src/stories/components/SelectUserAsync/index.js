// @flow
/* eslint-disable require-jsdoc */

import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Query, ApolloConsumer } from 'react-apollo';
import AsyncPaginate from 'react-select-async-paginate';
import { Field } from 'formik';
import { pure } from 'utils/hocs';
import { USER_ROLES, MISSPELLED_ROLES } from 'constants/userRoles';
import { Label, Error, Wrapper, OptionWrapper, FormikFieldWrapper } from './styled';

import QUERY from './Users.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  error?: string,
  [key: string]: any,
};

type State = {
  search: string,
};

const DEFAULT_LIMIT = 20;

// the query client for QUERY
let queryCLient = {};

const accountTypes = [
  USER_ROLES.ADMIN,
  USER_ROLES.TECH,
  USER_ROLES.VIEW_ONLY,
  MISSPELLED_ROLES.REQUESTOR,
  USER_ROLES.LIMITED_TECH,
  USER_ROLES.VENDOR,
  USER_ROLES.CUSTOMER,
];

// option being handled in previous
// select components :/
// this option gets pushed in the array at the beggining
// to give the option in multi select filters to select
// all the items where no such entity is attached
// to get the flow - search noSelect
const addnOption = {
  id: 'notAssigned',
  name: 'No User Assigned',
};

const setUserAttributes = (users: Array<Object> = []) => {
  return users.map(u => {
    const user = { ...u };
    if (user.firstName) {
      // for customers & vendors
      // businessName & customerName gets set to firstName
      user.name = user.firstName;

      if (user.lastName) {
        user.name += ` ${user.lastName}`;
      }
    }

    if (!user.name || !user.name.trim()) {
      user.name = '-';
    }
    return user;
  });
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
      {data.legacyAccountType && <p>{data.legacyAccountType}</p>}
    </OptionWrapper>
  );
};

class UserDropdown extends PureComponent<$FlowLintFix, State> {
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
    await queryCLient
      .query({
        query: QUERY,
        variables: {
          limit: DEFAULT_LIMIT,
          search,
          accountType: this.props.accountType,
          offset: prevOptions ? prevOptions.length : DEFAULT_LIMIT,
        },
      })
      .then(({ data }) => {
        res = setUserAttributes(data.users);
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
    const cacheBustSearch = search === '' ? [] : search;

    return (
      <ApolloConsumer>
        {// eslint-disable-next-line no-return-assign
        client => (
          // eslint-disable-next-line no-sequences
          (queryCLient = client),
          (
            <Wrapper>
              {this.props.label && <Label>{this.props.label}</Label>}
              <AsyncPaginate
                classNamePrefix="react-select"
                {...this.props}
                loadOptions={this.loadOptions}
                inputValue={search}
                onInputChange={this.handleInputChange}
                cacheUniq={cacheBustSearch}
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
// eslint-disable-next-line no-shadow
const DefaultValueQuery = ({ value, onChange, addnOption, ...props }: Object) => {
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
    return <UserDropdown {...props} value={undefined} onChange={handleOnChange} />;
  }

  if (Array.isArray(value) && typeof value[0] !== 'string') {
    return <UserDropdown {...props} value={value} onChange={handleOnChange} />;
  }

  if (!Array.isArray(value) && typeof value !== 'string') {
    return <UserDropdown {...props} value={value} onChange={handleOnChange} />;
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
      }}
    >
      {({ data, loading }) => {
        const users = noSelect
          ? [addnOption, ...setUserAttributes(data.users)]
          : setUserAttributes(data.users);
        return (
          <UserDropdown
            {...props}
            isLoading={props.loading || loading}
            value={users}
            onChange={handleOnChange}
          />
        );
      }}
    </Query>
  );
};

// eslint-disable-next-line no-shadow
const DefaultOptionsQuery = ({ noSelect, excludeUserTypes, addnOption, ...props }: Object) => {
  const accountType = accountTypes.filter(
    type => !excludeUserTypes || excludeUserTypes.indexOf(type) === -1,
  );
  return (
    <Query
      query={QUERY}
      variables={{
        limit: DEFAULT_LIMIT,
        search: '',
        accountType,
      }}
    >
      {({ data }) => {
        const users = noSelect
          ? [addnOption, ...setUserAttributes(data ? data.users : [])]
          : setUserAttributes(data ? data.users : []);

        return (
          <I18n ns="translations">
            {t => (
              <DefaultValueQuery
                loading
                defaultOptions={users}
                placeholder={t('generic.selectUser')}
                addnOption={addnOption}
                accountType={accountType}
                {...props}
              />
            )}
          </I18n>
        );
      }}
    </Query>
  );
};

export const SelectUser = pure(DefaultOptionsQuery);

const FormikInterface = ({
  field: { name, value },
  form: { setFieldValue, errors },
  multi,
  additionalSelect,
  disabled,
  ...props
}: Object) => {
  const additionalOption = {
    id: additionalSelect ? additionalSelect.value : addnOption.name,
    name: additionalSelect ? additionalSelect.label : addnOption.name,
  };
  // eslint-disable-next-line no-shadow
  const onChange = value => {
    setFieldValue(name, value || '');
    if (typeof props.onChange === 'function') {
      props.onChange(value);
    }
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
      addnOption={additionalOption}
    />
  );
};

// NOTE: We intentionally extract className so we don't
// accidentally pass it into <Field />
export const FormikField = ({ className, ...props }: *) => {
  return (
    <FormikFieldWrapper>
      <Field {...props} component={FormikInterface} />
    </FormikFieldWrapper>
  );
};
