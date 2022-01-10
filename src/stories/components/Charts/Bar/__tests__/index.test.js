import React from 'react';
import { shallow } from 'enzyme';
import Bar from 'components/Charts/Bar/index';

describe('<Bar />', () => {
  it('should render correctly', () => {
    const sut = shallow(<Bar data={['0', '-1', '2', '3.5', '-4.5']} />);

    expect(sut).toMatchSnapshot();
  });
});
