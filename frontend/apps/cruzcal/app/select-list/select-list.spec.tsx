import { render } from '@testing-library/react';

import { DefaultSelectList } from './select-list';

describe('SelectList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultSelectList/>);
    expect(baseElement).toBeTruthy();
    
  });
});
