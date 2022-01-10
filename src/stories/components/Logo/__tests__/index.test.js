import React from 'react';
import { mount } from 'enzyme';
import Logo, { LogoSensors } from 'components/Logo';

describe('<Logo />', () => {
  it('should render correctly', () => {
    const sut = mount(<Logo />);

    expect(sut).toMatchSnapshot();
  });
});

describe('<LogoSensors />', () => {
  it('should render correctly', () => {
    const sut = mount(<LogoSensors />);

    expect(sut).toMatchSnapshot();
  });
});
