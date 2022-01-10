import React from 'react';
import { mount } from 'enzyme';
import Pagination from 'components/Pagination/index';

describe('<Pagination />', () => {
  const mandatoryProps = {
    totalItemsCount: 10,
    onChange: jest.fn(),
  };

  it('should correctly handle clicks with mandatory props', () => {
    const props = {
      ...mandatoryProps,
    };
    const sut = mount(<Pagination {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with optional params', () => {
    const props = {
      ...mandatoryProps,
      activePage: 2,
      itemsCountPerPage: 5,
      pageRangeDisplayed: 5,
      prevPageText: '<-',
      nextPageText: '->',
      lastPageText: '>>',
      firstPageText: '<<',
      hideFirstLastPages: false,
      hideDisabled: true,
      hideNavigation: false,
      verticalAlign: true,
    };
    const sut = mount(<Pagination {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
