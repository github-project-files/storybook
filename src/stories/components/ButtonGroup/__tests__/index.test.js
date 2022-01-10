import React from 'react';
import { mount } from 'enzyme';
import ButtonGroup from 'components/ButtonGroup/index';

describe('<ButtonGroup />', () => {
  const mandatoryProps = {
    options: [
      {
        tooltip: 'tooltip',
        value: '0',
      },
    ],
    tooltip: 'tooltip',
    value: ['0', '1', '2'],
    onChange: jest.fn(),
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<ButtonGroup {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });
});
