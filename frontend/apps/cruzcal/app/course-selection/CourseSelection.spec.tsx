import { render, screen, waitFor } from '@testing-library/react';
import { atom } from 'jotai';

import CourseSelection from './CourseSelection';
import { defaultCourseSelection } from '../../atoms/course-selector';

import {exampleSelection} from '../../mocks/data';

describe('CourseSelection', () => {
  it('default course selection', async () => {
    const courseSelection = atom(defaultCourseSelection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    waitFor(async () => {
      await screen.findByText('Select Subject...');
      await screen.findByText('Select Course...');
    })
  });
  it('subject and no course', async () => {
    const selection = {...exampleSelection, course: null};
    const courseSelection = atom(selection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    waitFor(async () => {
      await screen.findByText(selection.subject.name);
      await screen.findByText('Select Course...');
    })
  });
  it('subject and course', async () => {
    const courseSelection = atom(exampleSelection);

    render(<CourseSelection courseAtom={courseSelection} remove={() => {}}/>);

    waitFor(async () => {
      await screen.findByText(exampleSelection.subject.name);
      await screen.findByText(exampleSelection.course.name);
    })
  });
});
