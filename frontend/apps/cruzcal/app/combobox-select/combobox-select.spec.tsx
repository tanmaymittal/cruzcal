import { render } from '@testing-library/react';

import ComboboxSelect, { DefaultComboboxSelect } from './combobox-select';

describe('ComboboxSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultComboboxSelect />);
    expect(baseElement).toBeTruthy();
  });
});
