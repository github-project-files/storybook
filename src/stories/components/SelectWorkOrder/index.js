// @flow

import React, { PureComponent } from 'react';
import { ApolloConsumer } from 'react-apollo';
import Select from 'react-select/lib/Async';
import ClockIcon from 'assets/commonIcons/clock.svg';
import RepeatIcon from 'assets/commonIcons/repeat.svg';
import moment from 'moment';
import {
  Label,
  Error,
  Wrapper,
  OptionWrapper,
  OptionDetail,
  OptionLeft,
  WOStatus,
  OptionRight,
  OptionTitle,
  OptionInfo,
  WONumber,
  WOTitle,
} from './styled';

import QUERY from './WorkOrders.graphql';

// eslint-disable-next-line no-unused-vars
type Props = {
  multiSelect?: boolean,
  error?: string,
  raw?: boolean,
  workOrderId?: string,
  additionalSelect?: { label: string, value: string },
  [key: string]: any,
};

type State = {
  search: string,
};

const DEFAULT_LIMIT = 50;

/**
 * generate options
 * @return {Object} Object
 */
const Option = ({
  innerProps,
  innerRef,
  data,
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
      <OptionDetail>
        <OptionLeft>
          <WOStatus status={data.status} />
        </OptionLeft>
        <OptionRight>
          <OptionTitle>
            <WONumber>#{data.number}</WONumber>
            <WOTitle>{data.title}</WOTitle>
            {data.rootId && <RepeatIcon />}
          </OptionTitle>
          {data.dueDate && (
            <OptionInfo>
              <ClockIcon />
              <span>{moment(data.dueDate).format('D MMMM, YYYY')}</span>
            </OptionInfo>
          )}
        </OptionRight>
      </OptionDetail>
    </OptionWrapper>
  );
};

class SelectWorkOrder extends PureComponent<$FlowLintFix, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    search: this.props.initialSearch || '',
  };

  handleInputChange = (value: string) => {
    this.setState({ search: value });
  };

  loadOptions = (value: string, client: any) => {
    const queryVars = {
      limit: DEFAULT_LIMIT,
      search: value,
      mode: 'ALL',
      status: ['OPEN', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETE'],
      objectId: {},
    };

    if (this.props.workOrderId) {
      queryVars.objectId = { notContainedIn: [this.props.workOrderId] };
    }

    return client
      .query({
        query: QUERY,
        variables: queryVars,
      })
      .then(({ data }) => data.workOrders);
  };

  /**
   * Render an PageHeader
   * @return {React$Node}
   */
  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Wrapper>
              {this.props.label && <Label>{this.props.label}</Label>}
              <Select
                isMulti={this.props.multiSelect}
                classNamePrefix="react-select"
                placeholder="Search Work Order"
                {...this.props}
                loadOptions={() => this.loadOptions(this.state.search, client)}
                defaultOptions
                inputValue={this.state.search}
                onInputChange={this.handleInputChange}
                components={{
                  Option,
                }}
                isClearable
                getOptionLabel={data => data.title}
                getOptionValue={data => data.id}
              />
              {this.props.error && <Error>{this.props.error}</Error>}
            </Wrapper>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default SelectWorkOrder;
