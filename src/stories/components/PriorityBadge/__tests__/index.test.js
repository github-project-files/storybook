import React from 'react';
import { shallow } from 'enzyme';
import PriorityBadge from '../index';

describe('<PriorityBadge />', () => {
  describe('compact view', () => {
    const displayStyle = 'compact';

    it('should render correctly with NONE priority with default view', () => {
      const c = shallow(<PriorityBadge priority="NONE" />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with NONE priority', () => {
      const c = shallow(<PriorityBadge priority="NONE" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with LOW priority', () => {
      const c = shallow(<PriorityBadge priority="LOW" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with MEDIUM priority', () => {
      const c = shallow(<PriorityBadge priority="MEDIUM" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with HIGH priority', () => {
      const c = shallow(<PriorityBadge priority="HIGH" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });
  });

  describe('full view', () => {
    const displayStyle = 'full';

    it('should render correctly with NONE priority', () => {
      const c = shallow(<PriorityBadge priority="NONE" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with LOW priority', () => {
      const c = shallow(<PriorityBadge priority="LOW" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with MEDIUM priority', () => {
      const c = shallow(<PriorityBadge priority="MEDIUM" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });

    it('should render correctly with HIGH priority', () => {
      const c = shallow(<PriorityBadge priority="HIGH" displayStyle={displayStyle} />);

      expect(c).toMatchSnapshot();
    });
  });
});
