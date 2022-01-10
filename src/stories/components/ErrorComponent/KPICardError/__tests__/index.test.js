import React from 'react';
import { mount } from 'enzyme';
import PageError from 'components/ErrorComponent/KPICardError/index';

describe('<PageError />', () => {
  it('should render correctly', () => {
    const sut = mount(<PageError />);

    expect(sut).toMatchSnapshot();
  });
});
