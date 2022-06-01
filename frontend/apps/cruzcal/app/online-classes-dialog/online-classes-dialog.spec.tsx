import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { Provider, useSetAtom } from 'jotai';

import OnlineClassesDialog from './online-classes-dialog';

import { courseSelectionsAtom } from '../../atoms/course-selector';
import { CourseSelector } from '../../atoms/course-selector';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('OnlineClassesDialog', () => {
  it('no asynchronous classes', async () => {
    const updatedCourses: CourseSelector[] = [
      // Course 1
      {
        term: {
          code: 2224,
          name: '2022 Summer Quarter',
          date: {
            end: '08/26/22',
            start: '07/25/22',
          },
        },
        subject: {
          name: 'ANTH',
        },
        course: {
          name: 'Intr Culturl Anthro',
          subject: 'ANTH',
          professor: ['Evans,D.N.'],
          section: '01',
          coursenum: '2',
          courseID: 70299,
          lectures: [
            {
              location: 'Engineer 2 194',
              recurrence: {
                days: ['Tuesday', 'Thursday'],
                time: {
                  start: '13:00',
                  end: '16:30',
                },
              },
            },
          ],
        },
      },
    ];

    const Updater = () => {
      const setCSelections = useSetAtom(courseSelectionsAtom);
      return (
        <>
          <button onClick={() => setCSelections(updatedCourses)}>
            Update Courses
          </button>
        </>
      );
    };

    const { findByText } = render(
      <Provider>
        <OnlineClassesDialog />
        <Updater />
      </Provider>,
      container
    );

    expect(container).toBeTruthy();
    await waitFor(() => {
      findByText('Asynchronous Classes');
    });
    expect(container).not.toContain('Asynchronous Classes');
  });

  it('one asynchronous class', async () => {
    const updatedCourses: CourseSelector[] = [
      {
        term: {
          code: 2224,
          name: '2022 Summer Quarter',
          date: {
            end: '08/26/22',
            start: '07/25/22',
          },
        },
        subject: {
          name: 'ANTH',
        },
        course: {
          name: 'Intr Biolog Anth',
          subject: 'ANTH',
          professor: ['Kassadjikova,K.K.'],
          section: '01',
          coursenum: '1',
          courseID: 70021,
          lectures: [
            {
              location: 'Remote Instruction',
              recurrence: null,
            },
          ],
        },
      },
    ];

    const Updater = () => {
      const setCSelections = useSetAtom(courseSelectionsAtom);
      return (
        <>
          <button onClick={() => setCSelections(updatedCourses)}>
            Update Courses
          </button>
        </>
      );
    };

    const { getByText } = render(
      <Provider>
        <OnlineClassesDialog />
        <Updater />
      </Provider>,
      container
    );

    expect(container).toBeTruthy();

    fireEvent.click(getByText('Update Courses'));
    await waitFor(() => {
      getByText('Asynchronous Classes');
    });

    expect(container).toBeTruthy();
  });
});
