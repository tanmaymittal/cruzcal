import { render } from '@testing-library/react';

import Desktop from './desktop';

describe('Desktop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Desktop />);
    expect(baseElement).toBeTruthy();
  });
});
