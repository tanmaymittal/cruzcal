const scheduleRequest = {
  'termCode': 2222,
  'courses': [{
    'courseID': '50444',
  }],
};

const scheduleImproperFormatRequest = {
  'termCode': 2222,
  'courses': [
    '50444',
  ],
};

const calendarRequest = {
  'termCode': 2222,
  'courses': [
    {'courseID': '51457'}, {'courseID': '50444'}, {'courseID': '50355'},
  ],
};

const calendarImproperRequest = {
  'termCode': 2222,
  'courses': [
    '51457', '50444', '50355',
  ],
};

const calendarIcsString =
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:TZCQ9_ulSy5U25HYgP1uW
SUMMARY:Com Sys/Assmbly Lan
DTSTAMP:20220503T090600Z
DTSTART:20220429T184000Z
DTEND:20220429T201500Z
LOCATION:ClassroomUnit 002
RRULE:FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;UNTIL=20220603T000000Z
END:VEVENT
BEGIN:VEVENT
UID:Ksf4W3-H87xGFcRMfa30B
SUMMARY:Intro Software Eng
DTSTAMP:20220503T090600Z
DTSTART:20220428T150000Z
DTEND:20220428T160500Z
LOCATION:J Baskin Engr 152
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20220603T000000Z
END:VEVENT
BEGIN:VEVENT
UID:fL7-fyXZQjM2Zyhlgx7cR
SUMMARY:Personal Computers
DTSTAMP:20220503T090600Z
DTSTART:20220429T222000Z
DTEND:20220429T235500Z
LOCATION:ClassroomUnit 002
RRULE:FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;UNTIL=20220603T000000Z
END:VEVENT
END:VCALENDAR`;

module.exports = {
  scheduleRequest,
  scheduleImproperFormatRequest,
  calendarRequest,
  calendarImproperRequest,
  calendarIcsString,
};
