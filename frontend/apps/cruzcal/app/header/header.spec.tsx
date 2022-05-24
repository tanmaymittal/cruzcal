import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";

import Header from './header';

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

describe('Header', () => {
  it('should render successfully', () => {
    const { findByText, getByText } = render(
      <Header />,
      container
    );

    expect(container).toBeTruthy();

    getByText('CruzCal');
    getByText('All your classes. One calendar file.');
  });
});
