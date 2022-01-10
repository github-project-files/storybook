import React from 'react';
import { shallow } from 'enzyme';
import ProtectedRoute from '../index';

describe('<ProtectedRoute />', () => {
  const component = () => 'Some Route component';
  const defaultPath = '';

  it('should render correctly when route is available', () => {
    const isAvailable = () => true;
    const c = shallow(
      <ProtectedRoute component={component} isAvailable={isAvailable} defaultPath={defaultPath} />,
    );

    expect(c).toMatchSnapshot();
  });

  it('should render correctly when route is not available', () => {
    const isAvailable = () => false;
    const c = shallow(
      <ProtectedRoute component={component} isAvailable={isAvailable} defaultPath={defaultPath} />,
    );

    expect(c).toMatchSnapshot();
  });
});
