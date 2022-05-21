exports.terms = [
  {
    code: 2224,
    start: '2022-07-25',
    end: '2022-08-26',
    name: '2022 Summer Quarter',
  },
  {
    code: 2222,
    start: '2022-03-28',
    end: '2022-06-03',
    name: '2022 Spring Quarter',
  },
  {
    code: 2220,
    start: '2022-01-03',
    end: '2022-03-11',
    name: '2022 Winter Quarter',
  },
  {
    code: 2218,
    start: '2021-09-23',
    end: '2021-12-03',
    name: '2021 Fall Quarter',
  },
  {
    code: 2214,
    start: '2021-07-26',
    end: '2021-08-27',
    name: '2021 Summer Quarter',
  },
  {
    code: 2212,
    start: '2021-03-29',
    end: '2021-06-04',
    name: '2021 Spring Quarter',
  },
  {
    code: 2210,
    start: '2021-01-04',
    end: '2021-03-12',
    name: '2021 Winter Quarter',
  },
  {
    code: 2208,
    start: '2020-10-01',
    end: '2020-12-11',
    name: '2020 Fall Quarter',
  },
];

exports.courses = [
  {
    'name': 'No lecture time class',
    'refnum': 66666,
    'subject': 'CSE',
    'coursenum': '666',
    'professor': ['Cruzcal'],
    'lectures': [{
      'location': 'TBD',
      'recurrence': null,
    }],
    'termcode': 2222,
  },
  {
    'name': 'Adv Programming',
    'refnum': 70158,
    'subject': 'CSE',
    'coursenum': '111',
    'professor': [
      'Harrison,D.C.',
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
            'end': '12:30',
            'start': '09:00',
          },
        },
      },
    ],
    'termcode': 2224,
  },
  {
    'name': 'Intro Software Eng',
    'refnum': 50444,
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
    'subject': 'AM',
    'coursenum': '20',
    'professor': 'Lu,L.K.',
    'lectures': [
      {
        'location': 'Engineer 2 192',
        'recurrence': {
          'day': [
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
    'termcode': 2224,
  },
  {
    'name': 'Intro Print/Draw',
    'refnum': 70072,
    'subject': 'ART',
    'coursenum': '20G',
    'professor': 'Henry,B.M.',
    'lectures': [
      {
        'location': 'E Baskin G101',
        'recurrence': {
          'day': [
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
    'subject': 'ART',
    'coursenum': '20J',
    'professor': 'Terrell,S.',
    'lectures': [
      {
        'location': 'E Baskin M101',
        'recurrence': {
          'day': [
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
    'subject': 'ART',
    'coursenum': '20K',
    'professor': 'Harris,Y.C.',
    'lectures': [
      {
        'location': 'Online',
        'recurrence': null,
      },
    ],
    'termcode': 2224,
  },
];
