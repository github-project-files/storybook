// @flow
import React, { PureComponent } from 'react';
import { PageWrapper } from './styled';

type Props = {
  pageText?: string,
  pageNumber: number,
  onClick: Function,
  isActive?: boolean,
  isDisabled?: boolean,
};

class Page extends PureComponent<Props> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    isActive: false,
    isDisabled: false,
  };

  handleClick = (e: Object) => {
    const { isDisabled, pageNumber } = this.props;
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    this.props.onClick(pageNumber);
  };

  /**
   * render a customizable page
   * @return {React$Node}
   */
  render() {
    const { pageText } = this.props;
    return (
      <PageWrapper isActive={this.props.isActive} onClick={this.handleClick}>
        <span>{pageText}</span>
      </PageWrapper>
    );
  }
}

export default Page;
