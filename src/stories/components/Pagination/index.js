// @flow

import React, { PureComponent } from 'react';
import BasePaginator from 'paginator';
import Page from './page';
import { Wrapper } from './styled';

type Props = {
  totalItemsCount: number,
  onChange: Function,
  activePage?: number,
  itemsCountPerPage?: number,
  pageRangeDisplayed?: number,
  prevPageText?: string,
  nextPageText?: string,
  lastPageText?: string,
  firstPageText?: string,
  hideFirstLastPages?: boolean,
  hideDisabled?: boolean,
  hideNavigation?: boolean,
  verticalAlign?: boolean,
};

class Pagination extends PureComponent<Props> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    itemsCountPerPage: 10,
    pageRangeDisplayed: 5,
    activePage: 1,
    prevPageText: '⟨',
    firstPageText: '«',
    nextPageText: '⟩',
    lastPageText: '»',
    hideFirstLastPages: false,
    verticalAlign: false,
  };

  isFirstPageVisible = (hasPreviousPage: boolean) => {
    const { hideDisabled, hideFirstLastPages } = this.props;
    if (hideFirstLastPages || (hideDisabled && !hasPreviousPage)) {
      return false;
    }
    return true;
  };

  isPrevPageVisible = (hasPreviousPage: boolean) => {
    const { hideDisabled, hideNavigation } = this.props;
    if (hideNavigation || (hideDisabled && !hasPreviousPage)) {
      return false;
    }
    return true;
  };

  isNextPageVisible = (hasNextPage: boolean) => {
    const { hideDisabled, hideNavigation } = this.props;
    if (hideNavigation || (hideDisabled && !hasNextPage)) {
      return false;
    }
    return true;
  };

  isLastPageVisible = (hasNextPage: boolean) => {
    const { hideDisabled, hideFirstLastPages } = this.props;
    if (hideFirstLastPages || (hideDisabled && !hasNextPage)) {
      return false;
    }
    return true;
  };

  /**
   * create pages from page component
   * @return {React$Node}
   */
  buildPages() {
    const pages = [];
    const {
      itemsCountPerPage,
      pageRangeDisplayed,
      activePage,
      prevPageText,
      nextPageText,
      firstPageText,
      lastPageText,
      totalItemsCount,
      onChange,
    } = this.props;

    const paginationInfo = new BasePaginator(itemsCountPerPage, pageRangeDisplayed).build(
      totalItemsCount,
      activePage,
    );

    for (let i = paginationInfo.first_page; i <= paginationInfo.last_page; i += 1) {
      pages.push(
        <Page
          isActive={i === activePage}
          key={i}
          pageNumber={i}
          pageText={`${i}`}
          onClick={onChange}
        />,
      );
    }

    // eslint-disable-next-line no-unused-expressions
    this.isPrevPageVisible(paginationInfo.has_previous_page) &&
      pages.unshift(
        <Page
          key={`prev${paginationInfo.previous_page}`}
          pageNumber={paginationInfo.previous_page}
          onClick={onChange}
          pageText={prevPageText}
          isDisabled={!paginationInfo.has_previous_page}
        />,
      );

    // eslint-disable-next-line no-unused-expressions
    this.isFirstPageVisible(paginationInfo.has_previous_page) &&
      pages.unshift(
        <Page
          key="first"
          pageNumber={1}
          onClick={onChange}
          pageText={firstPageText}
          isDisabled={!paginationInfo.has_previous_page}
        />,
      );

    // eslint-disable-next-line no-unused-expressions
    this.isNextPageVisible(paginationInfo.has_next_page) &&
      pages.unshift(
        <Page
          key={`next${paginationInfo.next_page}`}
          pageNumber={paginationInfo.next_page}
          onClick={onChange}
          pageText={nextPageText}
          isDisabled={!paginationInfo.has_next_page}
        />,
      );

    // eslint-disable-next-line no-unused-expressions
    this.isLastPageVisible(paginationInfo.has_next_page) &&
      pages.unshift(
        <Page
          key="last"
          pageNumber={paginationInfo.total_pages}
          onClick={onChange}
          pageText={lastPageText}
          isDisabled={paginationInfo.current_page === paginationInfo.total_pages}
        />,
      );

    return pages;
  }

  /**
   * short and sweet render
   * @return {React$Node}
   */
  render() {
    const pages = this.buildPages();
    return <Wrapper verticalAlign={this.props.verticalAlign}>{pages}</Wrapper>;
  }
}

export default Pagination;
