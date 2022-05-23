import { render } from '@testing-library/react';

import ComboboxSelect from './combobox-select';

describe('ComboboxSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComboboxSelect />);
    expect(baseElement).toBeTruthy();
  });
});
