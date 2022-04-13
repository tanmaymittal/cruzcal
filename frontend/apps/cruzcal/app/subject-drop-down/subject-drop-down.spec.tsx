import { render } from '@testing-library/react';

import SubjectDropDown from './subject-drop-down';

describe('SubjectDropDown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubjectDropDown />);
    expect(baseElement).toBeTruthy();
  });
});
