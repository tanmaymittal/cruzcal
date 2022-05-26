import { render, screen, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

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
  it('should render successfully', async () => {
    const { container } = render(<InformationPane />);
    expect(container).toBeTruthy();
  });

  // it('click on question mark icon', async () => {
  //   const { container } = render(<InformationPane />);
  //   const questionIcon = await screen.findByRole('faCircleQuestion', {name: /faCircleQuestion/i});

  //   await waitFor(() => {
  //     expect(questionIcon).not.toBeDisabled();
  //   });
  // });
});
