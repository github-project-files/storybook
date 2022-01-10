import React from 'react';
import { mount } from 'enzyme';
import SidebarTabError from 'components/ErrorComponent/SidebarTab/index';

describe('<SidebarTabError />', () => {
  it('should render correctly with mandatory props', () => {
    const sut = mount(<SidebarTabError name="Name" />);

    expect(sut).toMatchSnapshot();
  });
});
