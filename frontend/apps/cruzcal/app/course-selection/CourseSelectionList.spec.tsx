import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { exampleSelection } from 'apps/cruzcal/mocks/data';

import CourseSelectionList from './CourseSelectionList';

describe('CourseSelectionList', () => {
  it('default course selection', async () => {
    render(<CourseSelectionList />);

    await screen.findByRole('combobox', {name: /combobox-input-term/i});
    await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    await screen.findByRole('combobox', {name: /combobox-input-course/i});
    await screen.findByRole('button', {name: /add-course/i});
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
  it('Add + Remove classes', async () => {
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
  it('Select term from dropdown', async () => {
    const user = userEvent.setup();
    const newTerm = exampleSelection.term;

    render(<CourseSelectionList />);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    // Before setting term, subject and course should be disabled
    await waitFor(() => {
      expect(subjectInput).toBeDisabled();
      expect(courseInput).toBeDisabled();
    })

    // Click dropdown button
    const termInput = await screen.findByRole('combobox', {name: /combobox-input-term/i});

    // Type in full term name
    await user.clear(termInput);
    await user.type(termInput, newTerm.name);

    // Should only be a single option
    const option = await screen.findByRole('option', {name: /combobox-option-term/i});

    await user.click(option);

    // After setting term, subject should be enabled and course should be disabled
    await waitFor(() => {
      expect(subjectInput).not.toBeDisabled();
      expect(courseInput).toBeDisabled();
    })
  });
})