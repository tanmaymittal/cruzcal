import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import userEvent from '@testing-library/user-event';

import InfoBox from './info-box';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

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

    // check that once user selects the drop down, verify that the panel comes up
    await waitFor(() => {
      expect(screen.findByRole('wButton', {name: /warning-button/i}));
      expect(user.click(wButton));
      expect(screen.findByText("After selecting course"));
    });
  });
});
