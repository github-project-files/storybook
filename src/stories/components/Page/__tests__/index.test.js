import React from 'react';
import { shallow } from 'enzyme';
import Page from '../index';
import 'jest-styled-components';

describe('<Page />', () => {
  it('snapshot', () => {
    const c = shallow(<Page />);

    expect(c).toMatchSnapshot();
  });

  it('should render props.children', () => {
    const c = shallow(
      <Page>
        <div id="foo" />
      </Page>,
    );

    expect(c.contains(<div id="foo" />)).toStrictEqual(true);
  });

  it('should handle props.withMargin', () => {
    const c = shallow(
      <Page>
        <div />
      </Page>,
    );

    expect(c.find('._test-inner-wrapper')).toHaveStyleRule('padding', '0');

    c.setProps({
      withMargin: true,
    });

    expect(c.find('._test-inner-wrapper')).toHaveStyleRule('padding', '10px');
  });

  it('should handle props.centered', () => {
    const c = shallow(
      <Page>
        <div />
      </Page>,
    );

    expect(c.find('._test-inner-wrapper')).toHaveStyleRule('align-items', 'flex-start');

    c.setProps({
      centered: true,
    });

    expect(c.find('._test-inner-wrapper')).toHaveStyleRule('align-items', 'center');
  });
});
