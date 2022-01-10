import React from 'react';
import { mount } from 'enzyme';
import Accordian from 'components/Accordian/index';
import { TitleBlock } from 'components/Accordian/styled';

describe('<Accordian />', () => {
  const Header = () => <p>Header</p>;
  const Body = () => <p>Body</p>;
  const onAccordionToggleMock = jest.fn();
  const mandatoryProps = {
    header: Header,
    body: Body,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with only mandatory props given', () => {
    const sut = mount(<Accordian {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with all props given', () => {
    const props = {
      ...mandatoryProps,
      alwaysOpen: true,
      useDefaultStyle: false,
      onAccordionToggle: onAccordionToggleMock,
      constdefaultOpen: true,
      className: '',
    };
    const sut = mount(<Accordian {...props} />);

    expect(sut).toMatchSnapshot();
  });

  it('should correctly toggle without custom handler', () => {
    const sut = mount(<Accordian {...mandatoryProps} />);

    expect(sut).toMatchSnapshot();

    sut.find(TitleBlock).simulate('click');

    expect(sut).toMatchSnapshot();
  });

  it('should call custom handler on toggle', () => {
    const props = {
      ...mandatoryProps,
      onAccordionToggle: onAccordionToggleMock,
    };
    const sut = mount(<Accordian {...props} />);

    expect(sut).toMatchSnapshot();

    expect(onAccordionToggleMock).toHaveBeenCalledTimes(0);

    sut.find(TitleBlock).simulate('click');

    expect(sut).toMatchSnapshot();

    expect(onAccordionToggleMock).toHaveBeenCalledTimes(1);
  });

  it('should not toggle if always open', () => {
    const props = {
      ...mandatoryProps,
      alwaysOpen: true,
    };
    const sut = mount(<Accordian {...props} />);

    expect(sut).toMatchSnapshot();

    sut.find(TitleBlock).simulate('click');

    expect(sut).toMatchSnapshot();
  });
});
