import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react'
import { unmountComponentAtNode } from "react-dom";
import { Provider, useSetAtom } from 'jotai';

import WarningDialog from './warning-dialog';

import { courseSelectionsAtom } from '../../atoms/course-selector';
import { CourseSelector } from '../../atoms/course-selector';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('WarningDialog', () => {
  it('two conflicting classes', async () => {
    const updatedCourses: CourseSelector[] = [
      // Course 1
      {
        "term": {
          "code": 2224,
          "name": "2022 Summer Quarter",
          "date": {
            "end": "08/26/22",
            "start": "07/25/22",
          }

        },
        "subject": {
          "name": "ANTH",
        },

        "course": {
          "name": "Intr Culturl Anthro",
          "professor": [
            "Evans,D.N."
          ],
          "section": "01",
          "coursenum": "2",
          "courseID": 70299,
          "lectures": [{
            "location": "Engineer 2 194",
            "recurrence": {
              "days": [
                "Tuesday",
                "Thursday"
              ],
              "time": {
                "start": "13:00",
                "end": "16:30",
              }
            }
          }],
        },
      },

      // Course 2
      {
        "term": {
          "code": 2224,
          "name": "2022 Summer Quarter",
          "date": {
            "end": "08/26/22",
            "start": "07/25/22",
          }

        },
        "subject": {
          "name": "AM",
        },

        "course": {
          "name": "Math Methods II",
          "professor": [
            "Lu,L.K."
          ],
          "section": "01",
          "coursenum": "20",
          "courseID": 70299,
          "lectures": [{
            "location": "Engineer 2 192",
            "recurrence": {
              "days": [
                "Tuesday",
                "Thursday"
              ],
              "time": {
                "start": "13:00",
                "end": "16:30",
              }
            }
          }],
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
      )
    }

    const { findByText, getByText } = render(
      <Provider>
        <WarningDialog />
        <Updater />
      </Provider>,
      container
    );

    expect(container).toBeTruthy();

    fireEvent.click(getByText('Update Courses'))
    await waitFor(() => {
      getByText('See warnings')
    });

    expect(container).toBeTruthy();
  });
});
