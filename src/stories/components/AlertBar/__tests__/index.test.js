import React from 'react';
import { mount } from 'enzyme';
import AlertBar from 'components/AlertBar/index';
import { CloseIcon } from 'components/AlertBar/styled';

describe('<AlertBar />', () => {
  const Children = () => <div>Children</div>;
  const onDismissMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with none theme', () => {
    const sut = mount(<AlertBar theme="none">{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with gray theme', () => {
    const sut = mount(<AlertBar theme="gray">{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with red theme', () => {
    const sut = mount(<AlertBar theme="red">{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with blue theme', () => {
    const sut = mount(<AlertBar theme="blue">{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with yellow theme', () => {
    const sut = mount(<AlertBar theme="yellow">{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();
  });

  it('should render correctly with green theme', () => {
    const sut = mount(<AlertBar theme="green">{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();
  });

  it('should dismiss correctly with custom handler', () => {
    const sut = mount(
      <AlertBar dismissable onDismiss={onDismissMock}>
        {Children}
      </AlertBar>,
    );

    expect(sut).toMatchSnapshot();

    expect(onDismissMock).toHaveBeenCalledTimes(0);

    sut.find(CloseIcon).simulate('click');

    expect(sut).toMatchSnapshot();

    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it('should dismiss correctly without handler provided', () => {
    const sut = mount(<AlertBar dismissable>{Children}</AlertBar>);

    expect(sut).toMatchSnapshot();

    sut.find(CloseIcon).simulate('click');

    expect(sut).toMatchSnapshot();
  });
});
