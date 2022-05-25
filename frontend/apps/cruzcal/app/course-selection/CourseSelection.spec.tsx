import { render, screen, waitFor } from '@testing-library/react';
import { atom } from 'jotai';

import CourseSelection from './CourseSelection';
import { CourseSelector, defaultCourseSelection } from '../../atoms/course-selector';

const exampleSelection: CourseSelector = {
  term: {
    code: 2222,
    name: '2022 Spring Quarter',
    date: {
      start: "2022-03-28",
      end: "2022-06-03"
    }
  },
  subject: { name: 'CSE' },
  course: {
    courseID: 50444,
    name: "Intro Software Eng",
    section: "01",
    coursenum: "115A",
    professor: [
      "Jullig,R.K."
    ],
    lectures: [
      {
        location: "J Baskin Engr 152",
        recurrence: {
          days: [
            "Monday",
            "Wednesday",
            "Friday"
          ],
          time: {
            start: "08:00",
            end: "09:05",
          }
        }
      }
    ]
  }
}

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
