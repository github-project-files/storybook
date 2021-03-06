/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render, renderRtl } from 'garden-test-utils';
import { Styled{{capitalize component}} } from './Styled{{capitalize component}}';

describe('Styled{{capitalize component}}', () => {
  it('renders default styling', () => {
    const { container } = render(<Styled{{capitalize component}} />);

    expect(container.firstChild).toHaveStyleRule('display', 'flex');
  });

  it('renders RTL styling if provided', () => {
    const { container } = renderRtl(<Styled{{capitalize component}} />);

    expect(container.firstChild).toHaveStyleRule('direction', 'rtl');
  });
});
