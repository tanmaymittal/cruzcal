import { render } from '@testing-library/react';

import InfoBox from './info-box';

describe('InfoBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoBox />);
    expect(baseElement).toBeTruthy();
  });
});
