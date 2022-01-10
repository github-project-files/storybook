import React from 'react';
import { mount } from 'enzyme';
import PageError from 'components/ErrorComponent/PageError/index';

describe('<PageError />', () => {
  it('should render correctly with mandatory props', () => {
    const sut = mount(<PageError name="Name" />);

    expect(sut).toMatchSnapshot();
  });
});
