const scheduleRequest = {
  'termCode': 2222,
  'courseIDs': ['50444'],
};

const scheduleImproperFormatRequest = {
  'termCode': 2222,
  'courses': ['50444'],
};

const calendarICSRequest = '/api/calendar/ics?termCode=2222&courseIDs=50444';
const calendarICSImproperRequest =
  '/api/calendar/ics?termCode=hello&courseIDs=50444';

const calendarIcsString =
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:lJCF_wieqyw-CE9hMOTQR
SUMMARY:Intro Software Eng
DTSTAMP:20220512T064600Z
DTSTART:20220428T150000Z
DTEND:20220428T160500Z
LOCATION:J Baskin Engr 152
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20220603T000000Z
END:VEVENT
END:VCALENDAR
`;

module.exports = {
  scheduleRequest,
  scheduleImproperFormatRequest,
  calendarICSRequest,
  calendarICSImproperRequest,
  calendarIcsString,
};
