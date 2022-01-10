import React from 'react';
import { mount } from 'enzyme';
import DueDate from 'components/DueDate/index';

describe('<DueDate />', () => {
  const mandatoryProps = {
    dueDate: '0',
    schedule: {
      some: 'thing',
    },
    status: 'COMPLETE',
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<DueDate {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with id', () => {
    const props = {
      ...mandatoryProps,
      id: 1,
    };
    const sut = mount(<DueDate {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly without schedule', () => {
    const props = {
      ...mandatoryProps,
      schedule: null,
    };
    const sut = mount(<DueDate {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly without due date', () => {
    const props = {
      ...mandatoryProps,
      dueDate: false,
    };
    const sut = mount(<DueDate {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if not completed', () => {
    const props = {
      ...mandatoryProps,
      status: '',
    };
    const sut = mount(<DueDate {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
