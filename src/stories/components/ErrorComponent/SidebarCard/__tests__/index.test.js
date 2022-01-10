import React from 'react';
import { mount } from 'enzyme';
import SidebarError from 'components/ErrorComponent/SidebarCard/index';

describe('<SidebarError />', () => {
  it('should render correctly with mandatory props', () => {
    const sut = mount(<SidebarError name="Name" />);

    expect(sut).toMatchSnapshot();
  });
});
