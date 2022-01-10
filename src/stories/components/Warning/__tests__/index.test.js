import React from 'react';
import { mount } from 'enzyme';
import Warning from 'components/Warning';

describe('<Warning />', () => {
  it('should render correctly with default warning text', () => {
    const sut = mount(<Warning />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with custom warning text', () => {
    const sut = mount(<Warning message="Test message" />);

    expect(sut).toMatchSnapshot();
  });
});
