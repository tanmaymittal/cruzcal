const ics = require('ics');
const {google} = require('googleapis');

const generateIcsData = (termData, courseData) => {
  const {
    error,
    value,
  } = ics.createEvents(coursesToEvents(termData, courseData));
  if (error) throw error;
  return value;
};


const testGoogleApi = (token, termData, coursesData) => {
  const oauth2Client = createOAuth2Client(token);
  const courseEvents = coursesToEventsGoogleApi(termData, coursesData);
  console.log('courseEvents', courseEvents);
  const calendar = google.calendar('v3');
  // calendar.events.list({
  //   auth: oauth2Client,
  //   calendarId: 'primary',
  //   timeMin: (new Date()).toISOString(),
  //   maxResults: 10,
  //   singleEvents: true,
  //   orderBy: 'starttime',
  // }, (err, response) => {
  //   console.log('err', err);
  //   console.log('response', response);
  // });

  // const event = {
  //   'summary': 'Google I/O 2022',
  //   'location': '800 Howard St., San Francisco, CA 94103',
  //   'description': 'A chance to hear more about Google\'s developer products.',
  //   'start': {
  //     'dateTime': '2022-05-28T09:00:00-07:00',
  //     'timeZone': 'America/Los_Angeles',
  //   },
  //   'end': {
  //     'dateTime': '2022-05-28T17:00:00-07:00',
  //     'timeZone': 'America/Los_Angeles',
  //   },
  //   'recurrence': [
  //     'RRULE:FREQ=DAILY;COUNT=2',
  //   ],
  // };

  courseEvents.forEach((event) => {
    calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('Error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.data.htmlLink);
    });
  });
};

// Helpers
const createOAuth2Client = (token) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    '/api/auth/google/redirect',
  );
  oauth2Client.credentials = {
    access_token: token,
  };
  return oauth2Client;
};

const coursesToEvents = (termData, courseData) => {
  const termDates = termData.date;
  const courseEvents = courseData
    .map((c) => {
      const times = c.lectures[0].times;
      const formattedStartTime = formatTime(times[0].start);
      const formattedEndTime = formatTime(times[0].end);
      const formattedStartDate = formatDate(termDates.start, 'number');
      const formattedEndDate = formatDate(termDates.end, 'string');
      const initialDate = getInitialDate(times, formattedStartDate);
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
        location: c.lectures[0].location ? c.lectures[0].location : '',
        recurrenceRule: createRecurrenceRule(times, formattedEndDate),
      };
    });

  return courseEvents;
};

const coursesToEventsGoogleApi = (termData, courseData) => {
  const termDates = termData.date;
  const courseEvents = courseData
    .map((c) => {
      const times = c.lectures[0].times;
      const startTime = times[0].start;
      const endTime = times[0].end;
      const formattedEndDate = formatDate(termDates.end, 'string');
      return {
        summary: c.name,
        start: {
          dateTime: `${termDates.start}T${startTime}:00-07:00`,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: `${termDates.start}T${endTime}:00-07:00`,
          timeZone: 'America/Los_Angeles',
        },
        location: c.lectures[0].location ? c.lectures[0].location : '',
        recurrence: [`RRULE:${createRecurrenceRule(times, formattedEndDate)}`],
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

const getInitialDate = (courseTimes, formattedStartDate) => {
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
  // find the day closest to termStartDateIdx that is >= to it
  const closestIdx = courseDaysIdx.filter((idx) => idx >= termStartDateIdx)[0];
  if (!closestIdx) {
    return (6 - termStartDateIdx) + courseDaysIdx[0];
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
   * @param {object} term - term object
   * @param {object[]} courses - array of course objects
   * @return {string} - newly created ics file
   */
  generateIcsData,
  testGoogleApi,
};
