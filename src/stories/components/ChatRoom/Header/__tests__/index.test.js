import React from 'react';
import { mount } from 'enzyme';
import ChatRoomHeader from 'components/ChatRoom/Header/index';
import { BackIcon } from 'components/ChatRoom/Header/styled';

describe('<ChatRoomHeader />', () => {
  const historyPushSpy = jest.fn();
  const mandatoryProps = {
    onOpenTeamPanel: jest.fn(),
    session: {
      id: 1,
    },
    history: {
      push: historyPushSpy,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with mandatory props', () => {
    const sut = mount(<ChatRoomHeader {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props', () => {
    const props = {
      ...mandatoryProps,
      channel: {
        users: [
          {
            id: 0,
            firstName: 'Name',
            lastName: 'Last',
          },
          {
            id: 1,
            firstName: 'Name',
            lastName: 'Last',
          },
          {
            id: 2,
            firstName: 'Name',
            lastName: 'Last',
          },
        ],
        type: 'DIRECT_MESSAGE',
      },
    };
    const sut = mount(<ChatRoomHeader {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with full props and unnamed users', () => {
    const props = {
      ...mandatoryProps,
      channel: {
        users: [
          {
            id: 0,
          },
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
        type: 'DIRECT_MESSAGE',
      },
    };
    const sut = mount(<ChatRoomHeader {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should redirect after click', () => {
    const sut = mount(<ChatRoomHeader {...mandatoryProps} />);

    expect(historyPushSpy).toHaveBeenCalledTimes(0);

    sut.find(BackIcon).simulate('click');

    expect(historyPushSpy).toHaveBeenCalledTimes(1);
  });
});
