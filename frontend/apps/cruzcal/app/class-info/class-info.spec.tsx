import { render } from '@testing-library/react';

import ClassInfo from './class-info';

describe('ClassInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassInfo />);
    expect(baseElement).toBeTruthy();
  });
});
