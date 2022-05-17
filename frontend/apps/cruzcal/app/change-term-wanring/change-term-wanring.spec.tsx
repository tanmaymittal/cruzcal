import { render } from '@testing-library/react';

import ChangeTermWanring from './change-term-wanring';

describe('ChangeTermWanring', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangeTermWanring />);
    expect(baseElement).toBeTruthy();
  });
});
