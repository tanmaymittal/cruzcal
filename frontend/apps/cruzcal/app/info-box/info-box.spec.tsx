import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";

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
  it('should render successfully', async () => {
    const { findByText, getByText } = render(
      <InfoBox />,
      container
    );

    expect(container).toBeTruthy();
    await findByText('How do I use this app?');
    await findByText('Term Selection: Be careful!');
  });
});
