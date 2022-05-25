/* eslint-disable max-len */
require('dotenv').config();
const {addGoogleCalApiEvents, generateNameForCalendarId} = require('../../calendar');
const {coursesData} = require('../common');

const termData = {
  'code': 2222,
  'name': '1234 Test Quarter',
  'date': {
    'start': '2022-05-25',
    'end': '2022-05-25',
  },
};

describe('Calendar functions properly generate events along helper functions', () => {
  test('Function addGoogleCalApiEvents creates google calendar events', async () => {
    const events = await addGoogleCalApiEvents(
      process.env.GOOGLE_TEST_TOKEN,
      termData,
      coursesData,
    );
    expect(events.length).toBe(2);
  });
  test('Function generateNameForCalendarId creates unique name for calendar', async () => {
    const calendarId = await generateNameForCalendarId(
      termData,
      coursesData,
    );
    expect(calendarId).toBe('1234 Test Quarter: Math Methods II, SOE Calculus III');
  });
});
