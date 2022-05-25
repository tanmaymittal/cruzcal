import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import CourseSelectionList from './CourseSelectionList';

describe('CourseSelectionList', () => {

  // Atoms keep local storage, so remove to prevent cross-test effects
  beforeEach(() => {
    localStorage.clear();
  })

  it('default course selection', async () => {
    render(<CourseSelectionList />);

    await screen.findByDisplayValue('Select Term...');
    await screen.findByDisplayValue('Select Subject...');
    await screen.findByDisplayValue('Select Course...');
  });
  it('No trash for single course', async () => {
    render(<CourseSelectionList />);

    await waitFor(() => {
      // If one class, no trash button
      expect(screen.queryByRole('button', {name: /delete-course/i})).not.toBeInTheDocument();
    })
  })
  it('Add classes', async () => {
    const user = userEvent.setup();
    render(<CourseSelectionList />);

    const numClasses = 4;
    const addCourseButton = await screen.findByRole('button', {name: /add-course/i});

    // Add n - 1 classes (making n total, since 1 initial class)
    for (let i = 0; i < numClasses - 1; i++) {
      await user.click(addCourseButton);
    }

    // if n > 1 classes, then n trash buttons
    const trashButtons = await screen.findAllByRole('button', {name: /delete-course/i});

    await waitFor(() => {
      expect(trashButtons).toHaveLength(numClasses);
    })
  });
  it('Remove classes', async () => {
    const user = userEvent.setup();
    render(<CourseSelectionList />);

    const numClasses = 4;
    const addCourseButton = await screen.findByRole('button', {name: /add-course/i});

    // Add n - 1 classes (making n total, since 1 initial class)
    for (let i = 0; i < numClasses - 1; i++) {
      await user.click(addCourseButton);
    }

    // if n > 1 classes, then n trash buttons
    const trashButtons = await screen.findAllByRole('button', {name: /delete-course/i});
    expect(trashButtons).toHaveLength(numClasses);

    // Press trash button n - 1 times (can't delete last one)
    for (let i = 0; i < numClasses - 1; i++) {
      const trashButtons = await screen.findAllByRole('button', {name: /delete-course/i});
      await user.click(trashButtons[0]);
    }

    // If one class, no trash button
    await waitFor(() => {
      expect(screen.queryByRole('button', {name: /delete-course/i})).not.toBeInTheDocument();
    });
  });
});
