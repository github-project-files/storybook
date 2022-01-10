import React from 'react';
import { mount } from 'enzyme';
import PopupMenu from 'components/PopupMenu/index';

describe('<PopupMenu />', () => {
  it('should render correctly without props', () => {
    const sut = mount(<PopupMenu />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with blue theme', () => {
    const sut = mount(<PopupMenu theme="blue" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with red theme', () => {
    const sut = mount(<PopupMenu theme="red" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with green theme', () => {
    const sut = mount(<PopupMenu theme="green" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with yellow theme', () => {
    const sut = mount(<PopupMenu theme="yellow" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with gray theme', () => {
    const sut = mount(<PopupMenu theme="gray" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if thin', () => {
    const sut = mount(<PopupMenu thin />);

    expect(sut).toMatchSnapshot();
  });
});
