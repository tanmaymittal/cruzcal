import { render } from '@testing-library/react';

import WarningDialog from './warning-dialog';

describe('WarningDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WarningDialog />);
    expect(baseElement).toBeTruthy();
  });
});
