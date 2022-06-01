import {
  getByText,
  queryByText,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CalendarView from './calendar-view';
import { exampleSelection } from '../../mocks/data';
import CourseSelectionList from '../course-selection/CourseSelectionList';
import moment from 'moment';

describe('CalendarView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalendarView />);
    expect(baseElement).toBeTruthy();
  });

  it('should render new courses when a course is added', async () => {
    const user = userEvent.setup();
    // const course = atom(exampleSelection);
    const newTerm = exampleSelection.term;

    // Render Calendar and CourseSelection dropdown
    const { container } = render(<CalendarView />);
    render(<CourseSelectionList />);

    // Get inputs
    const termInput = await screen.findByRole('combobox', {
      name: /combobox-input-term/i,
    });
    const subjectInput = await screen.findByRole('combobox', {
      name: /combobox-input-subject/i,
    });
    const courseInput = await screen.findByRole('combobox', {
      name: /combobox-input-course/i,
    });

    // Before setting term, subject and course should be disabled
    await waitFor(() => {
      expect(subjectInput).toBeDisabled();
      expect(courseInput).toBeDisabled();
    });

    // Type in full term name
    await user.clear(termInput);
    await user.type(termInput, newTerm.name);

    // Should only be a single term
    const termOption = await screen.findByRole('option', {
      name: /combobox-option-term/i,
    });

    // Select the term
    await user.click(termOption);

    // After setting term, subject should be enabled and course should be disabled
    await waitFor(() => {
      expect(subjectInput).not.toBeDisabled();
      expect(courseInput).toBeDisabled();
    });

    // Type in full subject
    await user.clear(subjectInput);
    await user.type(subjectInput, exampleSelection.subject.name);

    // Should only be a single subject
    const subjectOption = await screen.findByRole('option', {
      name: /combobox-option-subject/i,
    });

    // Select the subject
    await user.click(subjectOption);

    // After selecting subject, subject value should be equal to exampleSelection's subject and course should be enabled
    await waitFor(() => {
      expect(subjectInput).toHaveValue(exampleSelection.subject.name);
      expect(courseInput).not.toBeDisabled();
    });

    // Type in full course name
    await user.clear(courseInput);
    await user.type(courseInput, exampleSelection.course.coursenum);

    // Should only be a single course
    const courseOption = await screen.findByRole('option', {
      name: /combobox-option-course/i,
    });

    // Select the course
    await user.click(courseOption);

    // After selecting course, course value should be equal to exampleSelection's course
    await waitFor(() => {
      expect(courseInput).toHaveValue(
        `${exampleSelection.course.coursenum} - ${exampleSelection.course.section}: ${exampleSelection.course.name}`
      );
    });

    // Search for the courses in the calendar
    const { getAllByText } = within(container);

    // Validate that the course was added to the calendar
    await waitFor(() => {
      for (let i = 0; i < getAllByText.length; i++) {
        expect(
          getAllByText(
            `${exampleSelection.subject.name} ${exampleSelection.course.coursenum}`
          )[i]
        ).toBeInTheDocument();
      }
    });
  });

  it('should remove courses when a course is deleted', async () => {
    const user = userEvent.setup();
    const newTerm = exampleSelection.term;
    const alternativeTerm = '2022 Summer Quarter';

    // Render Calendar and CourseSelection dropdown
    const { container } = render(<CalendarView />);
    render(<CourseSelectionList />);

    // Get inputs
    const termInput = await screen.findByRole('combobox', {
      name: /combobox-input-term/i,
    });
    const subjectInput = await screen.findByRole('combobox', {
      name: /combobox-input-subject/i,
    });
    const courseInput = await screen.findByRole('combobox', {
      name: /combobox-input-course/i,
    });

    // Before setting term, subject and course should be disabled
    await waitFor(() => {
      expect(subjectInput).toBeDisabled();
      expect(courseInput).toBeDisabled();
    });

    // Type in full term name
    await user.clear(termInput);
    await user.type(termInput, newTerm.name);

    // Should only be a single term
    const termOption = await screen.findByRole('option', {
      name: /combobox-option-term/i,
    });

    // Select the term
    await user.click(termOption);

    // After setting term, subject should be enabled and course should be disabled
    await waitFor(() => {
      expect(subjectInput).not.toBeDisabled();
      expect(courseInput).toBeDisabled();
    });

    // Type in full subject
    await user.clear(subjectInput);
    await user.type(subjectInput, exampleSelection.subject.name);

    // Should only be a single subject
    const subjectOption = await screen.findByRole('option', {
      name: /combobox-option-subject/i,
    });

    // Select the subject
    await user.click(subjectOption);

    // After selecting subject, subject value should be equal to exampleSelection's subject and course should be enabled
    await waitFor(() => {
      expect(subjectInput).toHaveValue(exampleSelection.subject.name);
      expect(courseInput).not.toBeDisabled();
    });

    // Type in full course name
    await user.clear(courseInput);
    await user.type(courseInput, exampleSelection.course.coursenum);

    let courseOption: HTMLElement;
    // Wait until only one course option
    // more reliable for disappearance check
    await waitFor(() => {
      const courseOptions = screen.getAllByRole('option', {
        name: /combobox-option-course/i,
      });
      expect(courseOptions).toHaveLength(1);
      courseOption = courseOptions[0];
    });

    // Select the course
    await user.click(courseOption);

    // After selecting course, course value should be equal to exampleSelection's course
    await waitFor(() => {
      expect(courseInput).toHaveValue(
        `${exampleSelection.course.coursenum} - ${exampleSelection.course.section}: ${exampleSelection.course.name}`
      );
    });

    // Search for the courses in the calendar
    const { getAllByText } = within(container);

    // Validate that the course was added to the calendar
    await waitFor(() => {
      for (let i = 0; i < getAllByText.length; i++) {
        expect(
          getAllByText(
            `${exampleSelection.subject.name} ${exampleSelection.course.coursenum}`
          )[i]
        ).toBeInTheDocument();
      }
    });

    // Select a new term
    await user.clear(termInput);
    await user.type(termInput, alternativeTerm);

    // Select the term
    await user.click(termOption);

    // Validate that the course was removed from the calendar
    await waitFor(() => {
      expect(container).not.toHaveValue(
        `${exampleSelection.subject.name} ${exampleSelection.course.coursenum}`
      );
    });
  });

  it('should update the months a term covers when a new Term is selected', async () => {
    const user = userEvent.setup();
    const newTerm = exampleSelection.term;

    // Render Calendar and CourseSelection dropdown
    const { container } = render(<CalendarView />);
    render(<CourseSelectionList />);

    // Get inputs
    const termInput = await screen.findByRole('combobox', {
      name: /combobox-input-term/i,
    });
    const subjectInput = await screen.findByRole('combobox', {
      name: /combobox-input-subject/i,
    });
    const courseInput = await screen.findByRole('combobox', {
      name: /combobox-input-course/i,
    });

    // Before setting term, subject and course should be disabled
    await waitFor(() => {
      expect(subjectInput).toBeDisabled();
      expect(courseInput).toBeDisabled();
    });

    // Type in full term name
    await user.clear(termInput);
    await user.type(termInput, newTerm.name);

    // Should only be a single term
    const termOption = await screen.findByRole('option', {
      name: /combobox-option-term/i,
    });

    // Select the term
    await user.click(termOption);

    // Look for the Calendar title
    const { getByText } = within(container);

    // Get the formatted start and end date of the title
    const startDate = moment( exampleSelection.term.date.start,'YYYY-MM-DD').format('MMM YYYY');
    const endDate = moment(exampleSelection.term.date.end, 'YYYY-MM-DD').format('MMM YYYY');

    // Validate that the Calendar title has been updated with the term's start and end date
    await waitFor(() => {
      expect(getByText(`${startDate} - ${endDate}`)).toBeInTheDocument();
    });
  });
});
