const ics = require('ics');

// const event = {
//   start: [2018, 5, 30, 6, 30],
//   duration: {hours: 6, minutes: 30},
//   title: 'Bolder Boulder',
//   description: 'Annual 10-kilometer run in Boulder, Colorado',
//   location: 'Folsom Field, University of Colorado (finish line)',
//   url: 'http://www.bolderboulder.com/',
//   geo: {lat: 40.0095, lon: 105.2669},
//   categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
//   status: 'CONFIRMED',
//   busyStatus: 'BUSY',
//   organizer: {
//     name: 'Admin', email: 'Race@BolderBOULDER.com',
//   },
//   attendees: [
//     {
//       name: 'Adam Gibbons',
//       email: 'adam@example.com',
//       rsvp: true,
//       partstat: 'ACCEPTED',
//       role: 'REQ-PARTICIPANT',
//     },
//     {
//       name: 'Brittany Seaton',
//       email: 'brittany@example2.org',
//       dir: 'https://linkedin.com/in/brittanyseaton',
//       role: 'OPT-PARTICIPANT',
//     },
//   ],
// };

const generateIcsData = (termData, courseData) => {
  const {
    error,
    value,
  } = ics.createEvents(coursesToEvents(termData, courseData));

  if (error) {
    console.log(error);
    return;
  }

  return value;
};

// Helpers
// {
//     "term": {
//         "code": 2222,
//         "name": "2022 Spring Quarter",
//         "date": {
//             "start": "2022-03-28",
//             "end": "2022-06-03"
//         }
//     },
//     "courses": [
//         {
//             "name": "Universe Formation",
//             "professor": "Foley,R.J.",
//             "lectures": [
//                 {
//                     "times": [
//                         {
//                             "day": "Monday",
//                             "end": "17:05",
//                             "start": "16:00"
//                         },
//                         {
//                             "day": "Wednesday",
//                             "end": "17:05",
//                             "start": "16:00"
//                         },
//                         {
//                             "day": "Friday",
//                             "end": "17:05",
//                             "start": "16:00"
//                         }
//                     ],
//                     "location": "Thim Lecture 003"
//                 }
//             ]
//         }
//     ]
// }
const coursesToEvents = (termData, courseData) => {
  const termDates = termData.date;
  const courseEvents = courseData.map((c) => {
    const times = c.lectures[0].times;
    const start = times[0].start;
    const end = times[0].end;

    const formattedStartTime = formatTime(start);
    const formattedEndTime = formatTime(end);
    const formattedStartDate = formatDate(termDates.start, 'number');
    const formattedEndDate = formatDate(termDates.end, 'string');
    const initialDate = getInitialDate(formattedStartDate, times);
    return {
      title: c.name,
      start: [
        ...initialDate,
        formattedStartTime.hour,
        formattedStartTime.minute,
      ],
      end: [
        ...initialDate,
        formattedEndTime.hour,
        formattedEndTime.minute,
      ],
      // eslint-disable-next-line max-len
      recurrenceRule: createRecurrenceRule(times, formattedEndDate),
    };
  });

  return courseEvents;
};

const formatTime = (time) => {
  const [hour, minute] = time.split(':');
  return {
    hour: Number(hour),
    minute: Number(minute),
  };
};

const formatDate = (date, formatType) => {
  const [year, month, day] = date.split('-');
  if (formatType === 'string') {
    return {year, month, day};
  }
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
};

const getInitialDate = (formattedStartDate, courseTimes) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const courseDays = courseTimes.map((t) => t.day);
  const courseDaysIdx = courseDays.map((d) => days.indexOf(d));
  const termStartDate = new Date(
    formattedStartDate.year,
    formattedStartDate.month - 1,
    formattedStartDate.day,
  );
  console.log('termStartDate', termStartDate);
  const initialDate = new Date();
  const termStartDateIdx = termStartDate.getDay();
  const dayDifference = calculateDayDifference(courseDaysIdx, termStartDateIdx);
  initialDate.setDate(
    termStartDate.getDate() + dayDifference,
  );

  return [
    initialDate.getFullYear(),
    initialDate.getMonth(),
    initialDate.getDate(),
  ];
};

const calculateDayDifference = (courseDaysIdx, termStartDateIdx) => {
  // find the day closest to termStartDateIdx that is greater than or equal to
  const closestIdx = courseDaysIdx.filter((idx) => idx >= termStartDateIdx)[0];
  console.log('closestIdx', closestIdx);
  console.log('termStartDateIdx', termStartDateIdx);
  if (!closestIdx) {
    return (6-termStartDateIdx) + courseDaysIdx[0];
  }
  return closestIdx - termStartDateIdx;
};

const createRecurrenceRule = (times, date) => {
  const byDay = times.map((t) => t.day.slice(0, 2).toUpperCase()).join(',');
  const until = `${date.year}${date.month}${date.day}T000000Z`;

  return `FREQ=WEEKLY;BYDAY=${byDay};INTERVAL=1;UNTIL=${until}`;
};

module.exports = {
  /**
   * @param {object} term - term to add as a JSON object
   * @return {Promise<Model>} newly created row
   */
  generateIcsData,
};
