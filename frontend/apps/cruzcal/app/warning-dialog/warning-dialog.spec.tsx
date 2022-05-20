import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from "react-dom";
import { Provider, useSetAtom } from 'jotai';

import WarningDialog from './warning-dialog';

import { courseSelectionsAtom } from '../../atoms/course-selector';
import { CourseSelector } from '../../atoms/course-selector';

let container = null;
const setCSelections = useSetAtom(courseSelectionsAtom);

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
  it('should render successfully', async () => {
    // test 1: the warning dialog should NOT appear
    act(() => {
      render(
        <Provider>
          <WarningDialog />
        </Provider>, container);
    })
    expect(container).toBeTruthy();

    // add another test to scan the document to ensure that the warning component is not on the document

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
          "professor": "Evans,D.N.",
          "coursenum": "2",
          "courseID": 70299,
          "lectures": [{
            "location": "Engineer 2 194",
            "times": [{
              "day": "Tuesday",
              "start": "13:00",
              "end": "16:30",
            },
            {
              "day": "Thursday",
              "start": "13:00",
              "end": "16:30",
            }]
          }]
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
          "professor": "str",
          "coursenum": "str",
          "courseID": 70312,
          "lectures": [{
            "location": "Engineer 2 192",
            "times": [{
              "day": "Tuesday",
              "start": "13:00",
              "end": "16:30",
            },
            {
              "day": "Thursday",
              "start": "13:00",
              "end": "16:30",
            }]
          }]
        },
      },
    ];

    setCSelections(updatedCourses);

    // test 2: the warning dialog should appear: conflicts AM 2 & ANTHRO intro
    act(() => {
      render(
        <Provider>
          <WarningDialog />
        </Provider>, container);
    })

    // validate that the warningDialog has the two conflicting tests in it
    expect(container).toBeTruthy();
    // check data that I expect is here
  });
});
