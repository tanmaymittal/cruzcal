import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";

import Footer from './footer';

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

describe('Footer', () => {
  it('should render successfully', () => {
    const { findByText, getByText } = render(
      <Footer />,
      container
    );

    expect(container).toBeTruthy();
  });
});
