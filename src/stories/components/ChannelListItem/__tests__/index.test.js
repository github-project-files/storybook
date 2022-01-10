import React from 'react';
import { mount } from 'enzyme';
import ChannelListItem from 'components/ChannelListItem/index';

describe('<ChannelListItem />', () => {
  const onClickMock = jest.fn();
  const mandatoryProps = {
    channel: {
      id: 0,
      type: 'DIRECT_MESSAGE',
      users: [
        {
          id: 1,
        },
      ],
      pinned: true,
      avatar: 'Avatar',
      lastChannelMessage: {
        body: '',
        user: {
          firstname: 'Name',
        },
        createdAt: '',
      },
    },
    active: true,
    unread: true,
    session: {
      id: 2,
    },
    onClick: onClickMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with mandatory props', () => {
    const sut = mount(<ChannelListItem {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly for not direct messages', () => {
    const props = {
      ...mandatoryProps,
      channel: {
        ...mandatoryProps.channel,
        type: 'GROUP_MESSAGE',
      },
    };
    const sut = mount(<ChannelListItem {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly for inactive not direct messages', () => {
    const props = {
      ...mandatoryProps,
      channel: {
        ...mandatoryProps.channel,
        type: 'GROUP_MESSAGE',
      },
      active: false,
    };
    const sut = mount(<ChannelListItem {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it(`should render correctly for inactive, read, body message more than 155 chars
    and user with firstname and lastname`, () => {
    const props = {
      ...mandatoryProps,
      channel: {
        id: 0,
        type: 'DIRECT_MESSAGE',
        users: [
          {
            id: 1,
            firstName: 'First',
            lastName: 'Last',
          },
          {
            id: 2,
            firstName: 'First',
            lastName: 'Last',
          },
          {
            id: 3,
            firstName: 'First',
            lastName: 'Last',
          },
        ],
        pinned: false,
        name: 'Name',
        avatar: 'Avatar',
        lastChannelMessage: {
          body: `Should be more than 155 chars to test a specific case
            Should be more than 155 chars to test a specific case
            Should be more than 155 chars to test a specific case.`,
          user: {
            firstName: 'Name',
            lastName: 'Lastname',
          },
          createdAt: '',
        },
      },
      active: false,
      unread: false,
      session: {
        id: 2,
      },
    };
    const sut = mount(<ChannelListItem {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should call custom click handler', () => {
    const sut = mount(<ChannelListItem {...mandatoryProps} />);

    expect(onClickMock).toHaveBeenCalledTimes(0);

    sut.simulate('click');

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
