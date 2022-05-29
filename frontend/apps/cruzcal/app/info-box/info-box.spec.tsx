import { render, screen } from '@testing-library/react';

import InfoBox from './info-box';

describe('InfoBox', () => {
  it('should render successfully', async () => {
    render(<InfoBox />);
    await screen.findByText('Warning: Term Selection');
  });
});
