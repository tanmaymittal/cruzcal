import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CalendarView from './calendar-view';
import {exampleSelection} from '../../mocks/data';
import CourseSelectionList from '../course-selection/CourseSelectionList'


describe('CalendarView', () => {
  let exampleEvent =
    {
      id: "2222:50444",
      daysOfWeek: [1, 3, 5],
      title: "CSE 115A",
      starTime: "8:00",
      endTime: "9:05",
    };

  it('should render successfully', () => {
    const { baseElement } = render(<CalendarView />);
    expect(baseElement).toBeTruthy();
  });

  it('should render new courses when a course is added', async () => {
    const user = userEvent.setup();
    render(<CourseSelectionList />);
    render(<CalendarView />);

    const numClasses = 2;
    const addCourseButton = await screen.findByRole('button', {name: /add-course/i});

    // Add n - 1 classes (making n total, since 1 initial class)
    for (let i = 0; i < numClasses - 1; i++) {
      await user.click(addCourseButton);
    }

    
  });

  it('should remove courses when a course is deleted', () => {

  });

  it('should update the months a term covers when a new Term is selected', () => {

  });
});
