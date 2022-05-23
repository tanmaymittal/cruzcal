import { render } from '@testing-library/react';

import OnlineClassesDialog from './online-classes-dialog';

describe('OnlineClassesDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnlineClassesDialog />);
    expect(baseElement).toBeTruthy();
  });
});
