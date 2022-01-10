import React from 'react';
import { mount } from 'enzyme';
import StatusLabel from 'components/StatusLabel/index';

describe('<StatusLabel />', () => {
  const mandatoryProps = {
    status: 'COMPLETE',
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<StatusLabel {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if not complited with optional props', () => {
    const props = {
      ...mandatoryProps,
      status: 'OPEN',
      label: '"label"',
      size: 'sm',
      offset: 10,
      index: 1,
    };
    const sut = mount(<StatusLabel {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if completed with optional props', () => {
    const props = {
      ...mandatoryProps,
      status: 'COMPLETE',
      label: 'false',
      size: 'sm',
      offset: 10,
      index: 1,
    };
    const sut = mount(<StatusLabel {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
