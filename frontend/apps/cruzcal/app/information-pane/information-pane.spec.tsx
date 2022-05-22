import { render } from '@testing-library/react';

import InformationPane from './information-pane';

describe('InformationPane', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InformationPane />);
    expect(baseElement).toBeTruthy();
  });
});
