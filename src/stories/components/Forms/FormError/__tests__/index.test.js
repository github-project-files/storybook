import React from 'react';
import { shallow, mount } from 'enzyme';
import FormError from '../index';
import 'jest-styled-components';

describe('<FormError />', () => {
  it('snapshot', () => {
    const c = shallow(<FormError />);

    expect(c).toMatchSnapshot();
  });

  it('should render props.children', () => {
    const c = mount(<FormError>Invalid Email</FormError>);

    expect(c.find('label').text()).toContain('Invalid Email');
  });
});
