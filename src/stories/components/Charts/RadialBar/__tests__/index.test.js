import React from 'react';
import { mount } from 'enzyme';
import UpkRadialBarChart from 'components/Charts/RadialBar/index';

describe('<UpkRadialBarChart />', () => {
  const mandatoryProps = {
    data: [
      {
        name: 'Name',
        value: 0,
        fill: 'red',
      },
    ],
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<UpkRadialBarChart {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it(`should render correctly with full props and window's width 1036`, () => {
    const props = {
      ...mandatoryProps,
      percentValue: true,
    };
    const sut = mount(<UpkRadialBarChart {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
