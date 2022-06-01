import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { atom } from 'jotai';

import CourseSelection from './CourseSelection';
import { defaultCourseSelection } from '../../atoms/course-selector';

import {exampleSelection, terms} from '../../mocks/data';

describe('CourseSelection', () => {
  it('no term, subject course selection', async () => {
    const courseSelection = atom(defaultCourseSelection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    await waitFor(() => {
      expect(subjectInput).toBeDisabled();
      expect(courseInput).toBeDisabled();
    });
  });
  it('term, no subject or course', async () => {
    const selection = {...exampleSelection, subject: null, course: null};
    const courseSelection = atom(selection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    await waitFor(() => {
      expect(subjectInput).not.toBeDisabled();
      expect(courseInput).toBeDisabled();
    });
  });
  it('subject and no course', async () => {
    const selection = {...exampleSelection, course: null};
    const courseSelection = atom(selection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    expect(subjectInput).toHaveDisplayValue(selection.subject.name);

    await waitFor(() => {
      expect(subjectInput).not.toBeDisabled();
      expect(courseInput).not.toBeDisabled();
    });
  });
  it('subject and course', async () => {
    const courseSelection = atom(exampleSelection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    const subjectMatcher = new RegExp(exampleSelection.subject.name);
    const courseMatcher = new RegExp(exampleSelection.course.name);

    expect(subjectInput).toHaveDisplayValue(subjectMatcher);
    expect(courseInput).toHaveDisplayValue(courseMatcher);

    await waitFor(() => {
      expect(subjectInput).not.toBeDisabled();
      expect(courseInput).not.toBeDisabled();
    });
  });
  it('Change subject', async () => {
    const user = userEvent.setup();
    const courseSelection = atom(exampleSelection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    await user.clear(subjectInput);
    await user.type(subjectInput, 'AM');

    const option = await screen.findByRole('option', {name: /combobox-option-subject/i});

    await user.click(option);

    await waitFor(() => {
      expect(courseInput).toHaveDisplayValue(/Select Course/i);
    });
  });
})
