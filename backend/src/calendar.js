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


const addGoogleCalApiEvents = async (token, termData, coursesData) => {
  const oauth2Client = createOAuth2Client(token);
  const courseEvents = coursesToEventsGoogleApi(termData, coursesData);
  google.options({auth: oauth2Client});
  const calendar = google.calendar('v3');
  const candidateId = generateNameForCalendarId(termData, coursesData);
  const calendarId = candidateId ? candidateId : 'primary';
  const calendarResponse = await calendar.calendars.insert({
    requestBody: {
      'summary': calendarId,
      'time_zone': 'America/Los_Angeles',
    },
  });

  courseEvents.forEach((event) => {
    calendar.events.insert({
      calendarId: calendarResponse.data.id,
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

const generateNameForCalendarId = (termData, coursesData) => {
  let calendarId = `${termData.name}: `;
  coursesData.forEach((c) => {
    calendarId += `${c.name}, `;
  });
  return calendarId.substring(0, calendarId.length - 2);
};

const coursesToEvents = (termData, courseData) => {
  const termDate = termData.date;
  const events = [];
  for (const course of courseData) {
    for (const {location, recurrence} of course.lectures) {
      const formattedStartTime = formatTime(recurrence.time.start);
      const formattedEndTime = formatTime(recurrence.time.end);
      const formattedStartDate = formatDate(termDate.start, 'number');
      const formattedEndDate = formatDate(termDate.end, 'string');
      const initialDate = getInitialDate(recurrence.days, formattedStartDate);
      events.push({
        title: course.name,
        geo: {lat: 37.0, lon: -122.06}, // UCSC
        startOutputType: 'local',
        endOutputType: 'local',
        start: [
          initialDate.year,
          initialDate.month,
          initialDate.date,
          formattedStartTime.hour,
          formattedStartTime.minute,
        ],
        end: [
          initialDate.year,
          initialDate.month,
          initialDate.date,
          formattedEndTime.hour,
          formattedEndTime.minute,
        ],
        location,
        recurrenceRule: createRecurrenceRule(recurrence.days, formattedEndDate),
      });
    }
  }
  return events;
};

const coursesToEventsGoogleApi = (termData, courseData) => {
  const termDates = termData.date;
  const courseEvents = courseData
    .map((c) => {
      const times = c.lectures[0].times;
      const startTime = times[0].start;
      const endTime = times[0].end;
      const formattedStartDate = formatDate(termDates.start, 'number');
      const formattedEndDate = formatDate(termDates.end, 'string');
      const initialDate = getInitialDate(times, formattedStartDate);
      const formattedInitialDate = formatInitialDate(initialDate);
      return {
        summary: c.name,
        start: {
          dateTime: `${formattedInitialDate}T${startTime}:00-07:00`,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: `${formattedInitialDate}T${endTime}:00-07:00`,
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

const formatDate = (dateString, formatType) => {
  const [year, month, date] = dateString.split('-');
  if (formatType === 'string') {
    return {year, month, date};
  }
  return {
    year: Number(year),
    month: Number(month),
    date: Number(date),
  };
};

const formatInitialDate = (initialDateArr) => {
  let month = String(initialDateArr[1]);
  let day = String(initialDateArr[2]);
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return `${initialDateArr[0]}-${month}-${day}`;
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

  const termStartDate = new Date(
    formattedStartDate.year,
    formattedStartDate.month - 1,
    formattedStartDate.day,
  );
  const termStartDateIdx = termStartDate.getDay();
  const dayDifference = calculateDayDifference(courseDaysIdx, termStartDateIdx);
  termStartDate.setDate(termStartDate.getDate() + dayDifference);

  return [
    termStartDate.getFullYear(),
    termStartDate.getMonth() + 1,
    termStartDate.getDate(),
  ];
};

const calculateDayDifference = (courseDaysIdx, termStartDateIdx) => {
  // find the day closest to termStartDateIdx that is >= to it
  const closestIdx = courseDaysIdx.filter((idx) => idx >= termStartDateIdx)[0];
  if (!closestIdx) {
    return (7 - termStartDateIdx) + courseDaysIdx[0];
  }
  return closestIdx - termStartDateIdx;
};

const createRecurrenceRule = (days, endDate) => {
  const byDay = days.map((day) => day.slice(0, 2).toUpperCase()).join(',');
  const until = `${endDate.year}${endDate.month}${endDate.date}`;

  return `FREQ=WEEKLY;BYDAY=${byDay};INTERVAL=1;UNTIL=${until}`;
};

module.exports = {
  /**
   * @param {object} term - term object
   * @param {object[]} courses - array of course objects
   * @return {string} - newly created ics file
   */
  generateIcsData,
  addGoogleCalApiEvents,
};
