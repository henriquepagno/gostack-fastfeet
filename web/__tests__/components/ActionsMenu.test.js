import React from 'react';
import { render } from '@testing-library/react';

import ActionsMenu from '~/components/ActionsMenu';

jest.mock('react-redux');

describe('ActionsMenu component', () => {
  it('Should render children', () => {
    const { getByText } = render(
      <ActionsMenu>
        <p>Test</p>
      </ActionsMenu>
    );

    const child = getByText('Test');

    expect(child).toBeTruthy();
  });
});
