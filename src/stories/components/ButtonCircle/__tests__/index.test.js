import React from 'react';
import { mount } from 'enzyme';
import ButtonCircle from 'components/ButtonCircle/index';

describe('<ButtonCircle />', () => {
  it('should render correctly without theme', () => {
    const sut = mount(<ButtonCircle />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with red theme', () => {
    const sut = mount(<ButtonCircle theme="red" />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with blue theme', () => {
    const sut = mount(<ButtonCircle theme="blue" />);

    expect(sut).toMatchSnapshot();
  });
});
