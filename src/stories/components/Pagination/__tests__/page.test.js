import React from 'react';
import { mount } from 'enzyme';
import Page from 'components/Pagination/page';
import { PageWrapper } from '../styled';

describe('<Page />', () => {
  const mandatoryProps = {
    pageNumber: 0,
    onClick: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly handle clicks with mandatory props', () => {
    const sut = mount(<Page {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should correctly handle clicks if disabled and with optional params', () => {
    const clickHandler = jest.fn();
    const props = {
      ...mandatoryProps,
      onClick: clickHandler,
      isDisabled: true,
      pageText: 'Some text',
      isActive: true,
    };
    const sut = mount(<Page {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should go to page after click', () => {
    const clickHandler = jest.fn();
    const props = {
      ...mandatoryProps,
      onClick: clickHandler,
    };
    const sut = mount(<Page {...props} />);

    expect(clickHandler).toHaveBeenCalledTimes(0);

    sut.find(PageWrapper).simulate('click');

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should not go to page after click if disabled', () => {
    const clickHandler = jest.fn();
    const props = {
      ...mandatoryProps,
      onClick: clickHandler,
      isDisabled: true,
    };
    const sut = mount(<Page {...props} />);

    expect(clickHandler).toHaveBeenCalledTimes(0);

    sut.find(PageWrapper).simulate('click');

    expect(clickHandler).toHaveBeenCalledTimes(0);
  });
});
