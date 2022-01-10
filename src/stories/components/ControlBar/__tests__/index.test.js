import React from 'react';
import { mount } from 'enzyme';
import ControlBar from 'components/ControlBar/index';

describe('<ControlBar />', () => {
  it('should render correctly with full props', () => {
    const props = {
      onSelectItem: jest.fn(),
      left: [
        {
          type: 'tab',
        },
      ],
      right: [
        {
          type: 'dropdown-toggle',
        },
        {
          type: 'dropdown-nav',
        },
      ],
      center: [
        {
          type: 'checkbox',
        },
        {},
      ],
      className: 'className',
    };
    const sut = mount(<ControlBar {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with empty items', () => {
    const props = {
      onSelectItem: jest.fn(),
      left: [],
      right: [],
      center: [],
      className: 'className',
    };
    const sut = mount(<ControlBar {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
