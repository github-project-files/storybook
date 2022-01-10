import React from 'react';
import { mount } from 'enzyme';
import FileAccordian from 'components/FileAccordian/index';
import { TableCell, AddButton } from '../styled';

describe('<FileAccordian />', () => {
  const windowSave = window;
  const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();
  const analyticsMock = jest.fn();
  const onRemoveMock = jest.fn();
  const mandatoryProps = {
    workOrderId: 'id1',
    workOrderFiles: [],
    t: jest.fn(),
    onRemove: onRemoveMock,
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    window.analytics = {
      track: analyticsMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.analytics = windowSave.analytics;
  });

  it('should render correctly', () => {
    const sut = mount(<FileAccordian {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with optional props', () => {
    const props = {
      ...mandatoryProps,
      onUpdateWorkOrder: jest.fn(),
      alwaysOpen: true,
      canEdit: true,
      required: true,
      triggerFileUpgradeModal: jest.fn(),
      workOrderFiles: [
        {
          id: '1',
        },
      ],
    };

    const sut = mount(<FileAccordian {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should open file in new window for not pdf', () => {
    const props = {
      ...mandatoryProps,
      workOrderFiles: [
        {
          id: '2',
          originalName: 'Name',
          url: 'https://some.url.org',
        },
      ],
    };

    const sut = mount(<FileAccordian {...props} />);

    expect(windowOpenSpy).toHaveBeenCalledTimes(0);

    sut
      .find(TableCell)
      .at(1)
      .simulate('click');

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
  });

  it('should open file in modal in current window for pdf', () => {
    const props = {
      ...mandatoryProps,
      workOrderFiles: [
        {
          id: '3',
          originalName: 'Name',
          url: 'https://some.url.org/file.pdf',
        },
      ],
    };

    const sut = mount(<FileAccordian {...props} />);

    sut
      .find(TableCell)
      .at(1)
      .simulate('click');

    expect(windowOpenSpy).toHaveBeenCalledTimes(0);
  });

  it('should not remove file if can`t edit', () => {
    const props = {
      ...mandatoryProps,
      workOrderFiles: [
        {
          id: '4',
          originalName: 'Name',
          url: 'https://some.url.org/file.pdf',
        },
      ],
    };

    const sut = mount(<FileAccordian {...props} />);

    sut
      .find(TableCell)
      .at(2)
      .simulate('click');

    expect(onRemoveMock).toHaveBeenCalledTimes(0);
  });

  it('should remove file if can edit', () => {
    const props = {
      ...mandatoryProps,
      workOrderFiles: [
        {
          id: '5',
          originalName: 'Name',
          url: 'https://some.url.org/file.pdf',
        },
      ],
      canEdit: true,
    };

    const sut = mount(<FileAccordian {...props} />);

    expect(onRemoveMock).toHaveBeenCalledTimes(0);

    expect(sut).toMatchSnapshot();

    sut
      .find(TableCell)
      .at(2)
      .simulate('click');

    expect(onRemoveMock).toHaveBeenCalledTimes(1);

    expect(sut).toMatchSnapshot();
  });

  it('should not open add file modal if can`t edit', () => {
    const triggerFileUpgradeModalMock = jest.fn();
    const props = {
      ...mandatoryProps,
      workOrderFiles: [
        {
          id: '6',
          originalName: 'Name',
          url: 'https://some.url.org/file.pdf',
        },
      ],
      triggerFileUpgradeModal: triggerFileUpgradeModalMock,
    };

    const sut = mount(<FileAccordian {...props} />);

    sut.find(AddButton).simulate('click');

    expect(triggerFileUpgradeModalMock).toHaveBeenCalledTimes(0);
  });

  it(`should not open add file modal if can edit
  and use custom handler instead of opening modal if handler passed`, () => {
    const triggerFileUpgradeModalMock = jest.fn();
    const props = {
      ...mandatoryProps,
      workOrderFiles: [
        {
          id: '7',
          originalName: 'Name',
          url: 'https://some.url.org/file.pdf',
        },
      ],
      canEdit: true,
      triggerFileUpgradeModal: triggerFileUpgradeModalMock,
    };

    const sut = mount(<FileAccordian {...props} />);

    expect(triggerFileUpgradeModalMock).toHaveBeenCalledTimes(0);

    sut.find(AddButton).simulate('click');

    expect(triggerFileUpgradeModalMock).toHaveBeenCalledTimes(1);
  });
});
