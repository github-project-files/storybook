import React from 'react';
import { mount } from 'enzyme';
import SidePanel from 'components/SidePanel/index';

describe('<SidePanel />', () => {
  const mandatoryProps = {
    show: true,
  };

  it('should render correctly with mandatory props', () => {
    const sut = mount(<SidePanel {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly if not show and full props', () => {
    const props = {
      ...mandatoryProps,
      show: false,
      side: 'left',
      header: false,
    };
    const sut = mount(<SidePanel {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with header', () => {
    const props = {
      ...mandatoryProps,
      header: true,
      side: 'left',
    };
    const sut = mount(<SidePanel {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with header title, right side and 100% width when no show', () => {
    const props = {
      ...mandatoryProps,
      show: false,
      width: '100%',
      headerTitle: 'title',
      side: 'right',
    };
    const sut = mount(<SidePanel {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with headerButtons', () => {
    const props = {
      ...mandatoryProps,
      headerButtons: [() => {}],
    };
    const sut = mount(<SidePanel {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with right side if no show', () => {
    const props = {
      ...mandatoryProps,
      show: false,
      side: 'right',
    };
    const sut = mount(<SidePanel {...props} />);

    expect(sut).toMatchSnapshot();
  });
});
