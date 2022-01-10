import React from 'react';
import StyleGuide from 'utils/StyleGuide';
import { shallow, mount } from 'enzyme';
import Button from 'components/Button/index';
import 'jest-styled-components';

describe('<Button />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('snapshot', () => {
    const sut = shallow(<Button />);

    expect(sut).toMatchSnapshot();

    sut.setProps({
      width: 500,
    });

    expect(sut).toMatchSnapshot();
  });

  it('should render props.children', () => {
    const sut = mount(<Button>Hello World</Button>);

    expect(sut.find('button').text()).toContain('Hello World');
  });

  it('should handle props.onClick', () => {
    let clicked = false;

    const sut = mount(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        foo
      </Button>,
    );

    sut
      .find('button')
      .first()
      .simulate('click');

    expect(clicked).toStrictEqual(true);
  });

  it('should handle props.color', () => {
    const sut = mount(<Button />);

    expect(sut.find('button').first()).toHaveStyleRule(
      'background-color',
      // eslint-disable-next-line import/no-named-as-default-member
      StyleGuide.colors.transparent,
    );

    sut.setProps({
      theme: 'blue',
    });

    expect(sut.find('button').first()).toHaveStyleRule(
      'background-color',
      // eslint-disable-next-line import/no-named-as-default-member
      StyleGuide.colors.brightBlue,
    );

    sut.setProps({
      theme: 'green',
    });

    expect(sut.find('button').first()).toHaveStyleRule(
      'background-color',
      // eslint-disable-next-line import/no-named-as-default-member
      StyleGuide.colors.shamrockGreen,
    );
  });
});
