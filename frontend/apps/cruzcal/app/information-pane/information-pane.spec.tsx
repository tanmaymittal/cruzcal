import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import userEvent from '@testing-library/user-event';

import InformationPane from './information-pane';

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

describe('InformationPane', () => {
  // checks that the component actually renders
  it('should render successfully', async () => {
    const { container } = render(<InformationPane />);
    expect(container).toBeTruthy();
  });

  // checks that the correct icon appears on the screen
  it('question mark icon appears', async () => {
    render(<InformationPane />);

    await waitFor(() => {
      expect(screen.findByRole('faCircleQuestion', {name: /faCircleQuestion/i}));
    });
  });

  // checks when user clicks on the `?` icon => the information pane modal should appear
  it('user clicks on ? icon', async () => {
    const user = userEvent.setup();
    render(<InformationPane />);
    const qButton = await screen.findByRole('button', {name: /info-button/i});

    await waitFor(() => {
      expect(user.click(qButton));
      expect(screen.findByRole('combobox', {name: /information-pane/i}));
      expect(screen.findByText("How do I use this app?"));
      expect(screen.findByText("Warning: Term Selection"));
    });
  });

});
