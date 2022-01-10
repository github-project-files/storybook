import React from 'react';
import { mount } from 'enzyme';
import UpkPieChart from 'components/Charts/Pie/index';

describe('<UpkPieChart />', () => {
  const mandatoryProps = {
    data: [0, -1, 2, -3.5, 4.5],
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<UpkPieChart {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it(`should render correctly with full props and window's width 1036`, () => {
    const props = {
      ...mandatoryProps,
      colors: [''],
    };
    global.innerWidth = 1036;
    const sut = mount(<UpkPieChart {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
