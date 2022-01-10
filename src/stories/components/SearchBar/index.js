// @flow

import React, { Component } from 'react';
import { SearchBarWrapper, SubmitButton } from './styled';
import SearchIcon from './img/search.svg';
import ClearIcon from './img/clear.svg';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: Function,
  onSearchChange: Function,
  size?: 'sm',
  // eslint-disable-next-line react/no-unused-prop-types
  clear?: 'true' | 'false',
  value?: string,
  placeholder?: string,
};

type State = {
  searchValue?: string,
};

class SearchBar extends Component<Props, State> {
  // eslint-disable-next-line react/no-deprecated, react/sort-comp
  componentWillReceiveProps = (props: Object) => {
    this.setState({ searchValue: props.value });
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    searchValue: this.props.value,
  };

  inputRef: HTMLInputElement | null;

  /**
   * Stop propagation on clear icon click.
   * Fire onChange to clear SearchBar text
   * @param {Object} event
   * @param {Function} onChange
   */
  handleOnClearClick = (event: Object) => {
    event.stopPropagation();
    const el = this.inputRef;
    if (el && el.value) {
      el.value = '';
    }
    this.props.onSearchChange('');
  };

  handleSearchChange = (value: string) => {
    window.analytics.track('WorkOrdersList', {
      category: 'SearchTriggered',
    });
    this.setState({ searchValue: value });
  };

  handleSearchSubmit = (event: any) => {
    event.preventDefault();
    window.analytics.track('WorkOrdersList', {
      category: 'SearchTriggered',
    });
    const { searchValue } = this.state;
    this.props.onSearchChange(searchValue);
  };

  /**
   * Render SearchBar component to DOM
   * @return {React$Node}
   */
  render() {
    return (
      <SearchBarWrapper size={this.props.size}>
        <form className="search-form" action="/search" onSubmit={this.handleSearchSubmit}>
          <input
            // eslint-disable-next-line no-return-assign
            ref={r => (this.inputRef = r)}
            name="search"
            type="search"
            value={this.state.searchValue}
            placeholder={this.props.placeholder || 'Search...'}
            onChange={event => this.handleSearchChange(event.target.value)}
          />
          <SearchIcon />
          <ClearIcon onClick={event => this.handleOnClearClick(event)} />
          <SubmitButton type="submit" theme="blue" size="md" pill onClick={this.handleSearchSubmit}>
            Search
          </SubmitButton>
        </form>
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
