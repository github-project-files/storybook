import React from 'react';
import { mount } from 'enzyme';
import ButtonOutline from 'components/ButtonOutline/index';

describe('<ButtonOutline />', () => {
  const Child = () => <p>Child</p>;

  it('should render correctly without props', () => {
    const sut = mount(
      <ButtonOutline>
        <Child />
      </ButtonOutline>,
    );

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props', () => {
    const props = {
      theme: 'blue',
      pill: true,
    };
    const sut = mount(
      <ButtonOutline {...props}>
        <Child />
      </ButtonOutline>,
    );

    expect(sut).toMatchSnapshot();
  });
});
