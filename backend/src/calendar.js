const ics = require('ics');

const generateIcsData = (termData, courseData) => {
  const {
    error,
    value,
  } = ics.createEvents(coursesToEvents(termData, courseData));
  if (error) throw error;
  return value;
};

// Helpers
const coursesToEvents = (termData, courseData) => {
  const termDate = termData.date;
  const events = [];
  for (const course of courseData) {
    for (const {location, recurrence} of course.lectures) {
      if (recurrence === null) continue;

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
    formattedStartDate.month - 1, // 0-based months
    formattedStartDate.date,
  );

  const courseDaysIdx = courseTimes.map((d) => days.indexOf(d));
  const termStartDateIdx = termStartDate.getDay();
  const dayDifference = calculateDayDifference(courseDaysIdx, termStartDateIdx);

  const initialDate = new Date(termStartDate);
  initialDate.setDate(termStartDate.getDate() + dayDifference);

  return {
    year: initialDate.getFullYear(),
    month: initialDate.getMonth() + 1, // reset to 1-based months
    date: initialDate.getDate(),
  };
};

const calculateDayDifference = (courseDaysIdx, termStartDateIdx) => {
  // find the day closest to termStartDateIdx that is >= to it
  const closestIdx = courseDaysIdx.filter((idx) => idx >= termStartDateIdx)[0];
  if (!closestIdx) {
    return (courseDaysIdx[0] + 7) - termStartDateIdx;
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
};
