import { render } from '@testing-library/react';

import CalendarView from './calendar-view';

describe('CalendarView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalendarView />);
    expect(baseElement).toBeTruthy();
  });
});
