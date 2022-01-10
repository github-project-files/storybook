import React from 'react';
import { shallow } from 'enzyme';
import PanelCentered from '../index';

describe('<PanelCentered />', () => {
  it('snapshot', () => {
    const c = shallow(<PanelCentered />);

    expect(c).toMatchSnapshot();

    c.setProps({
      width: 500,
    });

    expect(c).toMatchSnapshot();
  });

  it('should render props.children', () => {
    const c = shallow(
      <PanelCentered>
        <div id="foo" />
      </PanelCentered>,
    );

    expect(c.contains(<div id="foo" />)).toStrictEqual(true);
  });
});
