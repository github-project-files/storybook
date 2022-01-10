import React from 'react';
import { mount } from 'enzyme';
import DropdownMenu from 'components/DropdownMenu/index';

describe('<DropdownMenu />', () => {
  const mandatoryProps = {
    menuItems: [
      {
        disabled: false,
        label: 'label',
        allowed: true,
        handleOnClick: jest.fn(),
        assignedTo: {
          id: '1',
        },
        id: '1',
        key: 'assignedTo',
        nested: true,
      },
      {
        disabled: false,
        allowed: false,
        label: 'label',
        key: 'quickFilter',
      },
      {
        disabled: true,
      },
      {
        disabled: false,
        label: 'label',
        key: 'dateRange',
        value: {
          start: 0,
          end: 0,
        },
        menuIcon: () => <p>Icon</p>,
      },
      {
        disabled: false,
        label: 'label',
      },
    ],
    display: true,
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<DropdownMenu {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props', () => {
    const props = {
      ...mandatoryProps,
      deleteItem: true,
      handleDelete: jest.fn(),
      persistentIcon: true,
      selectionIcon: () => <p>Icon</p>,
      selection: ['0', '1', '2'],
      header: () => <h1>Header</h1>,
    };
    const sut = mount(<DropdownMenu {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if loading', () => {
    const props = {
      ...mandatoryProps,
      isLoading: true,
    };
    const sut = mount(<DropdownMenu {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
