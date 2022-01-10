import React from 'react';
import { shallow, mount } from 'enzyme';
import FormLabel from '../index';

describe('<FormLabel />', () => {
  it('snapshot', () => {
    const c = shallow(<FormLabel />);

    expect(c).toMatchSnapshot();
  });

  it('should render props.children', () => {
    const c = mount(<FormLabel>First Name</FormLabel>);

    expect(c.find('label').text()).toContain('First Name');
  });
});
