import React from 'react';
import { mount } from 'enzyme';
import Tab from 'components/ControlBar/Tab';

describe('<Tab />', () => {
  const onSelectItemMock = jest.fn();
  const mandatoryProps = {
    onSelectItem: onSelectItemMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with full props', () => {
    const props = {
      ...mandatoryProps,
      item: {
        label: 'label',
        value: true,
      },
    };
    const sut = mount(<Tab {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if not active', () => {
    const props = {
      ...mandatoryProps,
      item: {
        label: 'label',
        value: false,
      },
    };
    const sut = mount(<Tab {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should select item', () => {
    const props = {
      ...mandatoryProps,
      item: {
        label: 'label',
        value: true,
      },
    };
    const sut = mount(<Tab {...props} />);

    expect(onSelectItemMock).toHaveBeenCalledTimes(0);

    sut.find(Tab).simulate('click');

    expect(onSelectItemMock).toHaveBeenCalledTimes(1);
  });
});
