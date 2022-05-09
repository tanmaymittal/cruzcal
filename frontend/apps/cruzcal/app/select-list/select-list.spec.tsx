import { render } from '@testing-library/react';

import SelectList from './select-list';

describe('SelectList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectList listName="SelectList" listOptions={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
