import React from 'react';
import { mount } from 'enzyme';
import AssigneeGroup from 'components/AssigneeGroup/index';

describe('<AssigneeGroup />', () => {
  const mandatoryProps = {
    id: 1,
    threshold: 1,
  };

  it('should render correctly with all params given', () => {
    const props = {
      ...mandatoryProps,
      assignedTo: [{ id: 'id', avatar: 'avatar' }],
      supportUsers: [],
      team: [],
      offset: 1,
      size: 'sm',
      tooltip: 'true',
    };
    const sut = mount(<AssigneeGroup {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with only mandatory params given', () => {
    const sut = mount(<AssigneeGroup {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly for assignee and team', () => {
    const props = {
      ...mandatoryProps,
      assignedTo: [{ id: 'id' }],
      team: ['SomeTeam'],
    };
    const sut = mount(<AssigneeGroup {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly for a team', () => {
    const props = {
      ...mandatoryProps,
      assignedTo: [{ id: 'id', team: 'SomeTeam' }],
    };
    const sut = mount(<AssigneeGroup {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly for many assignees', () => {
    const props = {
      ...mandatoryProps,
      assignedTo: [{ id: 'id' }],
      supportUsers: [{ id: 'id2' }],
    };
    const sut = mount(<AssigneeGroup {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
