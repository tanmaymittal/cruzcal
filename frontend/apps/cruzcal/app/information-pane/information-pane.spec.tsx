import { render, screen, waitFor } from '@testing-library/react';

import InformationPane from './information-pane';

describe('InformationPane', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<InformationPane />);
    expect(baseElement).toBeTruthy();
  });
});
