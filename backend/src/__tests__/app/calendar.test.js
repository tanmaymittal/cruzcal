/* eslint-disable max-len */
require('dotenv').config();
const {genNameForCalendarSummary, formatDateString} = require('../../calendar');
const {coursesData} = require('../common');

const date = new Date();
const calendarDate = formatDateString({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
});

const termData = {
  'code': 2222,
  'name': '1234 Test Quarter',
  'date': {
    'start': calendarDate,
    'end': calendarDate,
  },
};

describe('Calendar utilities', () => {
  const calendarSummary = genNameForCalendarSummary(
    termData,
    coursesData,
  );

  test('Generate unique name for calendar', () => {
    expect(calendarSummary).toBe('1234 Test Quarter: Math Methods II, SOE Calculus III');
  });
  // Removed live test creating google calendar event
  // test('Function addGoogleCalApiEvents creates google calendar events', async () => {
  //   const {calendarId, courseEvents: events} = await addGoogleCalApiEvents(
  //     process.env.GOOGLE_TEST_TOKEN,
  //     termData,
  //     coursesData,
  //   );
  //   expect(events.length).toBe(2);

  //   // Cleanup calendar after test
  //   try {
  //     await deleteCalendar(process.env.GOOGLE_TEST_TOKEN, calendarId);
  //   } catch (error) {
  //     console.error(error);
  //     expect(error).toBeFalsy(); // throw an error
  //   }
  // });
});
