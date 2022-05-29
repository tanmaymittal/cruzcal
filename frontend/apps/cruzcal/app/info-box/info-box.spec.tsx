import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InfoBox from './info-box';

describe('InfoBox', () => {
  // checks that the component actually renders
  it('should render successfully', async () => {
    render(<InfoBox />);
    await screen.findByText('Warning: Term Selection');
  });

  // checks that user can the select drop down
  it('user opens warning dialog drop down', async () => {
    const user = userEvent.setup();
    render(<InfoBox />);
    const wButton = await screen.findByRole('button', {name: /warning-button/i});
    await user.click(wButton);
    await screen.findByText(/After selecting course/);
  });
});
