/* eslint-disable max-len */

// const scheduleRequest = {
//   'termCode': 2222,
//   'courseIDs': ['50444'],
// };

// const scheduleMultipleRequest = {
//   'termCode': 2222,
//   'courseIDs': ['50444', '70312'],
// };

// const scheduleImproperFormatRequest = {
//   'termCode': 2222,
//   'courses': ['50444'],
// };

// const JSONRequest = '/api/calendar/json?termCode=2222&courseIDs=66666';
// const calendarICSRequest = '/api/calendar/ics?termCode=2222&courseIDs=50444';
// const JSONMultipleRequest = '/api/calendar/json?termCode=2222&courseIDs=50444&courseIDs=70312';
// const ICSMultipleRequest = '/api/calendar/ics?termCode=2222&courseIDs=50444&courseIDs=70312';

// const JSONRequestNoTimes = '/api/calendar/json?termCode=2222&courseIDs=66666';
// const ICSRequestNoTimes = '/api/calendar/json?termCode=2222&courseIDs=66666';

// const calendarICSImproperRequest = '/api/calendar/ics?termCode=hello&courseIDs=50444';

// /**
//  * CSE Intro SWE class in Spring '22
//  */
// const calendarIcsString =
// `BEGIN:VCALENDAR
// VERSION:2.0
// CALSCALE:GREGORIAN
// PRODID:adamgibbons/ics
// METHOD:PUBLISH
// X-PUBLISHED-TTL:PT1H
// BEGIN:VEVENT
// UID:qZoULkEYnvhZgzv1Qh70b
// SUMMARY:Intro Software Eng
// DTSTAMP:20220522T185500Z
// DTSTART:20220328T080000
// DTEND:20220328T090500
// GEO:37;-122.06
// LOCATION:J Baskin Engr 152
// RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20220603
// END:VEVENT
// END:VCALENDAR
// `;

// module.exports = {
//   scheduleRequest,
//   scheduleMultipleRequest,
//   scheduleImproperFormatRequest,
//   JSONRequestNoTimes,
//   ICSRequestNoTimes,
//   calendarICSRequest,
//   calendarICSImproperRequest,
//   calendarIcsString,
// };
