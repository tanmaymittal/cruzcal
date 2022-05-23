import { render } from '@testing-library/react';

import Combobox from './combobox';

describe('Combobox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Combobox />);
    expect(baseElement).toBeTruthy();
  });
});
