import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from "react-dom";
// import { atom, useSetAtom } from 'jotai';
// import { useUpdateAtom } from 'jotai/utils';

import WarningDialog from './warning-dialog';
// import { courseSelectionsAtom } from '../../atoms/course-selector';

// import { CourseSelector } from '../../atoms/course-selector';

let container = null;
// const setCSelections = useSetAtom(courseSelectionsAtom);

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
    act(() => {
      render(<WarningDialog />, container);
    })

    // const updatedCourses: CourseSelector[] = [
    //   // Course 1
    //   {
    //     "term": {
    //       // http://localhost:3010/api/courses?term=2224&subject=ANTH
    //       // {"code":"2224","date":{"end":"08/26/22","start":"07/25/22"},"name":"2022 Summer Quarter"}
    //   "code": 2224,
    //   "name": "2022 Summer Quarter",
    //   "date": {
    //     "end": "08/26/22",
    //     "start": "07/25/22",
    //     }

    //     },
    //     "subject": {
    //       "name": "ANTH",
    //     },

    //     "course": {
    //       "name":	"Intr Culturl Anthro",
    //       "professor": "Evans,D.N.",
    //       "coursenum": "2",
    //       "courseID": 70299,
    //       "lectures": {
    //         "location": "Engineer 2 194",
    //         "times": [{
    //           "day": "Tuesday",
    //           "start": "13:00",
    //           "end": "16:30",
    //         },
    //           {
    //           "day": "Thursday",
    //           "start": "13:00",
    //           "end": "16:30",
    //         }]
    //       }
    //     },
    //   },

    //   // Course 2
    //   {
    //     "term": {
    //       // http://localhost:3010/api/courses?term=2224&subject=AM
    //       // {"code":"2224","date":{"end":"08/26/22","start":"07/25/22"},"name":"2022 Summer Quarter"}
    //   "code": 2224,
    //   "name": "2022 Summer Quarter",
    //   "date": {
    //     "end": "08/26/22",
    //     "start": "07/25/22",
    //     }

    //     },
    //     "subject": {
    //       "name": "AM",
    //     },

    //     "course": {
    //       "name":	"Math Methods II",
    //       "professor": "str",
    //       "coursenum": "str",
    //       "courseID": 70312,
    //       "lectures": {
    //         "location": "Engineer 2 192",
    //         "times": [{
    //           "day": "Tuesday",
    //           "start": "13:00",
    //           "end": "16:30",
    //         },
    //           {
    //           "day": "Thursday",
    //           "start": "13:00",
    //           "end": "16:30",
    //         }]
    //       }
    //     },
    //   },
    // ];
    // setCSelections(updatedCourses);

    expect(container).toBeTruthy();
  });
});
