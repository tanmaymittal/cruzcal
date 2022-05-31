import { CourseSelector } from "../atoms/course-selector";

const terms = [
  {
    code: 2224,
    name: '2022 Summer Quarter',
    date: {
      start: '2022-07-25',
      end: '2022-08-26',
    },
  },
  {
    code: 2222,
    name: '2022 Spring Quarter',
    date: {
      start: '2022-03-28',
      end: '2022-06-03',
    },
  },
  {
    code: 2220,
    name: '2022 Winter Quarter',
    date: {
      start: '2022-01-03',
      end: '2022-03-11',
    },
  },
  {
    code: 2218,
    name: '2021 Fall Quarter',
    date: {
      start: '2021-09-23',
      end: '2021-12-03',
    },
  },
];

const subjects = ['CSE', 'AM', 'ART'];

const courses = [
  {
    'name': 'Intro Software Eng',
    'refnum': 50444,
    'section': '01',
    'subject': 'CSE',
    'coursenum': '115A',
    'professor': [
      'Jullig,R.K.',
    ],
    'lectures': [
      {
        'location': 'J Baskin Engr 152',
        'recurrence': {
          'days': [
            'Monday',
            'Wednesday',
            'Friday',
          ],
          'time': {
            'end': '09:05',
            'start': '08:00',
          },
        },
      },
    ],
    'termcode': 2222,
  },
  {
    'name': 'Math Methods II',
    'refnum': 70312,
    'section': '01',
    'subject': 'AM',
    'coursenum': '20',
    'professor': [
      'Lu,L.K.',
    ],
    'lectures': [
      {
        'location': 'Engineer 2 192',
        'recurrence': {
          'days': [
            'Tuesday',
            'Thursday',
          ],
          'time': {
            'end': '16:30',
            'start': '13:00',
          },
        },
      },
    ],
    'termcode': 2222,
  },
  {
    'name': 'Intro Print/Draw',
    'refnum': 70072,
    'section': '01',
    'subject': 'ART',
    'coursenum': '20G',
    'professor': [
      'Henry,B.M.',
    ],
    'lectures': [
      {
        'location': 'E Baskin G101',
        'recurrence': {
          'days': [
            'Tuesday',
            'Thursday',
          ],
          'time': {
            'end': '16:00',
            'start': '09:30',
          },
        },
      },
    ],
    'termcode': 2224,
  },
  {
    'name': 'Intro Draw/Paint',
    'refnum': 70253,
    'section': '01',
    'subject': 'ART',
    'coursenum': '20J',
    'professor': [
      'Terrell,S.',
    ],
    'lectures': [
      {
        'location': 'E Baskin M101',
        'recurrence': {
          'days': [
            'Tuesday',
            'Thursday',
          ],
          'time': {
            'end': '19:00',
            'start': '13:00',
          },
        },
      },
    ],
    'termcode': 2224,
  },
  {
    'name': 'Intro New Media',
    'refnum': 71279,
    'section': '01',
    'subject': 'ART',
    'coursenum': '20K',
    'professor': [
      'Harris,Y.C.',
    ],
    'lectures': [
      {
        'location': 'Online',
        'recurrence': null,
      },
    ],
    'termcode': 2224,
  },
];

const exampleSelection: CourseSelector = {
  'term': {
    'code': 2222,
    'date': {
      'start': '2022-03-28',
      'end': '2022-06-03',
    },
    'name': '2022 Spring Quarter',
  },
  'subject': {
    'name': 'CSE'
  },
  'course':   {
    'name': 'Intro Software Eng',
    'courseID': 50444,
    'subject': 'CSE',
    'section': '01',
    'coursenum': '115A',
    'professor': [
      'Jullig,R.K.',
    ],
    'lectures': [
      {
        'location': 'J Baskin Engr 152',
        'recurrence': {
          'days': [
            'Monday',
            'Wednesday',
            'Friday',
          ],
          'time': {
            'end': '09:05',
            'start': '08:00',
          },
        },
      },
    ],
  }
}

export {terms, subjects, courses, exampleSelection};
