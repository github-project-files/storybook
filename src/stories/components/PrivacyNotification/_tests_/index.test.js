// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { setCookie } from 'utils';
import PrivacyNotification from '../index';
import { PrivacyButton, PrivacyCTA } from '../styled';
import 'jest-styled-components';

const mockT = t => t;

Object.defineProperty(global, 'document', {
  value: { cookie: '' },
  writable: true,
});

describe('<PrivacyNotification />', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    document.cookie = '';
  });

  it('renders privacy content', () => {
    const c = shallow(<PrivacyNotification t={mockT} />);

    // eslint-disable-next-line jest/prefer-inline-snapshots
    expect(c).toMatchSnapshot();
  });

  it('does not renders privacy content', () => {
    setCookie('isComplianceAccepted', 1);

    const c = shallow(<PrivacyNotification t={mockT} />);

    // eslint-disable-next-line jest/prefer-inline-snapshots
    expect(c).toMatchSnapshot();
    expect(c.isEmptyRender()).toBe(true);
  });

  it('does not render privacy content when CTA is clicked', () => {
    const mockEvent = { preventDefault: () => {} };
    const c = shallow(<PrivacyNotification t={mockT} />);

    c.find(PrivacyButton).simulate('click', mockEvent);

    expect(c.find(PrivacyCTA)).toHaveLength(0);
  });
});
