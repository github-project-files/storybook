import React from 'react';
import { mount } from 'enzyme';
import Error from 'components/Error/index';
import Button from 'components/Button';

describe('<Error />', () => {
  const mandatoryProps = {
    title: 'title',
    error: 'ERROR',
  };
  const reloadSpy = jest.spyOn(window.location, 'reload');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with mandatory props', () => {
    const sut = mount(<Error {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props', () => {
    const props = {
      ...mandatoryProps,
      errorInfo: 'Info',
      showReload: true,
    };
    const sut = mount(<Error {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should reload page after click', () => {
    const props = {
      ...mandatoryProps,
      errorInfo: 'Info',
      showReload: true,
    };
    const sut = mount(<Error {...props} />);

    expect(reloadSpy).toHaveBeenCalledTimes(0);

    sut.find(Button).simulate('click');

    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });
});
