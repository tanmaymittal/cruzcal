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
  console.log(courseData[0]);
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
  const courseEvents = courseData.map((c) => {
    return {
      title: c.name,
      start: [1, 1, 1],
      duration: {hours: 1, minutes: 0},
    };
  });

  return courseEvents;
};

module.exports = {
  /**
   * @param {object} term - term to add as a JSON object
   * @return {Promise<Model>} newly created row
   */
  generateIcsData,
};
