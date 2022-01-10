import React from 'react';
import { mount } from 'enzyme';
import Checkbox from 'components/Checkbox/index';

describe('<Checkbox />', () => {
  it('should render correctly with tooltip', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
      tooltipMessage: 'Tooltip',
      id: '0',
    };
    const sut = mount(<Checkbox {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly without tooltip', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const sut = mount(<Checkbox {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if enabled', () => {
    const props = {
      onClick: jest.fn(),
      checked: true,
      disabled: false,
      label: 'label',
    };
    const sut = mount(<Checkbox {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if enabled without label and check', () => {
    const props = {
      onClick: jest.fn(),
      disabled: false,
    };
    const sut = mount(<Checkbox {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
