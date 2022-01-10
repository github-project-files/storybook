import React from 'react';
import { mount } from 'enzyme';
import Badge from 'components/Badge/index';

describe('<Badge />', () => {
  it('should render correctly without theme', () => {
    const sut = mount(<Badge />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with none theme', () => {
    const sut = mount(<Badge theme="none" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with gray theme', () => {
    const sut = mount(<Badge theme="gray" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with red theme', () => {
    const sut = mount(<Badge theme="red" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with blue theme', () => {
    const sut = mount(<Badge theme="blue" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with yellow theme', () => {
    const sut = mount(<Badge theme="yellow" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with green theme', () => {
    const sut = mount(<Badge theme="green" />);

    expect(sut).toMatchSnapshot();
  });
});
