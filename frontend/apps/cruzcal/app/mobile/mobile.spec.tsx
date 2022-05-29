import { render } from '@testing-library/react';

import Mobile from './mobile';

describe('Mobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mobile />);
    expect(baseElement).toBeTruthy();
  });
});
