import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InformationPane from './information-pane';

describe('InformationPane', () => {
  // checks that the component actually renders
  it('should render successfully', async () => {
    const { container } = render(<InformationPane />);
    expect(container).toBeTruthy();
  });

  // checks that the correct icon appears on the screen
  it('question mark icon appears', async () => {
    render(<InformationPane />);
    await screen.findByRole('button', {name: /info-button/i});
  });

  // checks when user clicks on the `?` icon => the information pane modal should appear
  it('user clicks on ? icon', async () => {
    const user = userEvent.setup();
    render(<InformationPane />);
    const qButton = await screen.findByRole('button', {name: /info-button/i});

    await user.click(qButton);
    await screen.findByLabelText(/information-pane/i);
    await screen.findByText(/How do I use this app\?/);
    await screen.findByText(/Warning: Selecting a Different Term with Added Courses/);
  });
});
