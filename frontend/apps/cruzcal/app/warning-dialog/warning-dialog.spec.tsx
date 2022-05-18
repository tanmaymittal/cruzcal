import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from "react-dom";

import WarningDialog from './warning-dialog';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('WarningDialog', () => {
  it('should render successfully', async () => {
    act(() => {
      render(<WarningDialog />, container);
    })
    expect(container).toBeTruthy();
  });
});
