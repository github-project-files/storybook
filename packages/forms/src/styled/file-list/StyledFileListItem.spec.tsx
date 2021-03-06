/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from 'garden-test-utils';
import { StyledFileListItem } from './StyledFileListItem';

describe('StyledFileListItem', () => {
  it('renders the expected element', () => {
    const { container } = render(<StyledFileListItem />);

    expect(container.firstChild!.nodeName).toBe('LI');
    expect(container.firstChild).toHaveStyleRule('margin-top', '8px', {
      modifier: '&:not(:first-child)'
    });
  });
});
