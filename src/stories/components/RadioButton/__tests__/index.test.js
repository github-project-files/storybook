import React from 'react';
import { mount } from 'enzyme';
import RadioButton from 'components/RadioButton/index';

describe('<RadioButton />', () => {
  it('should render correctly without props', () => {
    const sut = mount(<RadioButton />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props', () => {
    const props = {
      onClick: jest.fn(),
      checked: true,
      label: 'label',
    };
    const sut = mount(<RadioButton {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
