import React from 'react';
import { shallow, mount } from 'enzyme';
import store from 'store';
import { PageHeader } from '../index';

describe('<PageHeader />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('snapshot', () => {
    const c = shallow(<PageHeader store={store} />);

    // eslint-disable-next-line jest/prefer-inline-snapshots
    expect(c).toMatchSnapshot();
  });

  it('should handle props.title', () => {
    const c = mount(<PageHeader store={store} title="Foobar" />);

    expect(c.find('._test-page-header-title').text()).toContain('Foobar');
  });

  it('should handle MenuIcon.onClick', () => {
    const c = mount(<PageHeader store={store} />);

    // Clicking on the menu icon should update the redux state `showMainMenu` property to true
    c.find('._test-menu-icon').simulate('click');

    expect(store.getState().showMainMenu).toStrictEqual(true);
  });
});
