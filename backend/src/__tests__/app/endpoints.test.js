/* eslint-disable max-len */
const supertest = require('supertest');
const http = require('http');
const {db, addTerm, addCourse} = require('../test-db');
const app = require('../../app');
const {courses, terms} = require('../common');

// Setup example objects for building mock inputs
const termCode = 2222;
const ids = courses
  .filter((({termcode, lectures}) => (
    termcode === termCode &&
    lectures.some(({recurrence}) => recurrence !== null)
  )))
  .map(({refnum}) => `${refnum}`);
const courseNoMeetings = courses.find(({lectures}) => (
  lectures.every(({recurrence}) => recurrence === null)
));

let server; let request;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);

  await db.sync({force: true});

  for (const term of terms) {
    await addTerm(term);
  }
  for (const course of courses) {
    await addCourse(course);
  }
});

afterAll(async () => {
  server.close();
  db.close();
});


test('Invalid endpoint', async () => {
  await request.get('/api/hello/world').expect((res) => {
    expect(res.status).not.toBe(200);
  });
});

describe('GET /api/terms', () => {
  test('responds with a 200 status code', async () => {
    await request.get('/api/terms').expect(200);
  });
  test('responds with JSON', async () => {
    await request
      .get('/api/terms')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        for (const term of res.body) {
          expect(term).toHaveProperty('code');
          expect(term).toHaveProperty('name');
          expect(term).toHaveProperty('date');
          expect(term.date).toHaveProperty('start');
          expect(term.date).toHaveProperty('end');
        }
      }); ;
  });
});

describe('GET /api/subjects', () => {
  test('success with no parameters', async () => {
    await request.get('/api/subjects').expect(200);
  });
  test('failure with invalid term', async () => {
    await request.get('/api/subjects?term=-1').expect(404);
  });
  test('success with term', async () => {
    await request
      .get('/api/subjects?term=2222')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        for (const term of res.body) {
          expect(typeof term).toBe('string');
        }
      });
  });
});

describe('GET /api/courses', () => {
  test('responds with a 200 status code', async () => {
    await request
      .get('/api/courses?term=2222&subject=CSE')
      .expect(200);
  });
  test('error with no parameters', async () => {
    await request.get('/api/courses').expect((res) => {
      expect(res.status).toBe(400);
    });
  });
  test('error with term parameter only', async () => {
    await request.get('/api/courses?term=2222').expect((res) => {
      expect(res.status).toBe(400);
    });
  });
  test('error with subject parameter only', async () => {
    await request.get('/api/courses?subject=CSE').expect((res) => {
      expect(res.status).toBe(400);
    });
  });
  test('error with invalid term arg', async () => {
    await request.get('/api/courses?term=-1&subject=CSE').expect((res) => {
      expect(res.status).toBe(404);
    });
  });
  test('error with invalid subject arg', async () => {
    await request.get('/api/courses?term=2222&subject=helloworld')
      .expect((res) => {
        expect(res.status).toBe(404);
      });
  });
  test('responds with JSON', async () => {
    await request
      .get('/api/courses?term=2222&subject=CSE')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        for (const course of res.body) {
          expect(course).toHaveProperty('name');
          expect(course).toHaveProperty('professor');
          expect(course).toHaveProperty('lectures');
        }
      });
  });
});


describe('POST /schedule/{type}', () => {
  const scheduleRequest = {
    'termCode': termCode,
    'courseIDs': ids.slice(0, 1),
  };

  const scheduleMultipleRequest = {
    'termCode': 2222,
    'courseIDs': ids.slice(0, 2),
  };

  const scheduleImproperFormatRequest = {
    'termCode': 2222,
    'courses': ids.slice(0, 1),
  };

  test('responds with a 201 status code', async () => {
    await request
      .post('/api/schedule/json')
      .send(scheduleRequest)
      .expect(201);
  });
  test('responds with JSON of courses', async () => {
    await request
      .post('/api/schedule/json')
      .send(scheduleRequest)
      .expect('Content-Type', /json/);
  });
  test('validate structure of multiple course schedule', async () => {
    await request
      .post('/api/schedule/json')
      .send(scheduleMultipleRequest)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('term');
        expect(res.body).toHaveProperty('courses');
        expect(res.body).toHaveProperty('uri');
        expect(res.body.courses).toBeInstanceOf(Array);
        expect(res.body.courses)
          .toHaveLength(scheduleMultipleRequest.courseIDs.length);
        for (let i = 0; i < res.body.courses.length; i++) {
          const course = res.body.courses[i];
          const expCourseID = scheduleMultipleRequest.courseIDs[i];
          const courseIDStr = `${course.courseID}`;
          expect(course).toHaveProperty('name');
          expect(course).toHaveProperty('section');
          expect(course).toHaveProperty('coursenum');
          expect(course).toHaveProperty('professor');
          expect(course).toHaveProperty('lectures');
          expect(course).toHaveProperty('courseID');
          expect(courseIDStr).toBe(expCourseID);
        }
      });
  });
  test('responds with 404 error for invalid term', async () => {
    const badSchedReq = {...scheduleRequest, termCode: -1};
    await request
      .post('/api/schedule/json')
      .send(badSchedReq)
      .expect(404);
  });
  test('responds with 404 error for invalid courseID', async () => {
    const badSchedReq = {
      ...scheduleRequest,
      courseIDs: ['hello,world!'],
    };
    await request
      .post('/api/schedule/json')
      .send(badSchedReq)
      .expect(404);
  });
  test('responds with 400 error for incorrect request', async () => {
    await request
      .post('/api/schedule/json')
      .send(scheduleImproperFormatRequest)
      .expect(400);
  });
});


describe('GET /api/calendar/json', () => {
  const JSONRequestNoTimes = `/api/calendar/json?termCode=${courseNoMeetings.termcode}&courseIDs=${courseNoMeetings.refnum}`;
  const JSONMultipleRequest = `/api/calendar/json?termCode=${termCode}&courseIDs=${ids[0]}&courseIDs=${ids[1]}`;
  const JSONRequest = `/api/calendar/json?termCode=${termCode}&courseIDs=${ids[0]}`;

  test('Success responds with 200 status', async () => {
    await request
      .get(JSONRequest)
      .expect(200);
  });
  test('Course has no meeting times', async () => {
    await request
      .get(JSONRequestNoTimes)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('courses');
        expect(res.body.courses).toBeInstanceOf(Array);
        for (const course of res.body.courses) {
          expect(course).toHaveProperty('lectures');
          expect(course.lectures).toBeInstanceOf(Array);
          course.lectures.forEach(({recurrence}) => {
            expect(recurrence).toBe(null);
          });
        }
      });
  });
  test('validate structure of single course schedule', async () => {
    await request
      .get(JSONRequest)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('term');
        expect(res.body).toHaveProperty('courses');
        expect(res.body.courses).toBeInstanceOf(Array);
        expect(res.body.courses).toHaveLength(1);
        for (const course of res.body.courses) {
          expect(course).toHaveProperty('name');
          expect(course).toHaveProperty('section');
          expect(course).toHaveProperty('coursenum');
          expect(course).toHaveProperty('professor');
          expect(course).toHaveProperty('lectures');
          expect(course).toHaveProperty('courseID');
        }
      });
  });
  test('validate structure of multiple course schedule', async () => {
    await request
      .get(JSONMultipleRequest)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('term');
        expect(res.body).toHaveProperty('courses');
        expect(res.body.courses).toBeInstanceOf(Array);
        expect(res.body.courses).toHaveLength(2);
        for (const course of res.body.courses) {
          expect(course).toHaveProperty('name');
          expect(course).toHaveProperty('section');
          expect(course).toHaveProperty('coursenum');
          expect(course).toHaveProperty('professor');
          expect(course).toHaveProperty('lectures');
          expect(course).toHaveProperty('courseID');
        }
      });
  });
});

describe('GET /api/calendar/ics', () => {
  const ICSRequestNoTimes = `/api/calendar/ics?termCode=${courseNoMeetings.termcode}&courseIDs=${courseNoMeetings.refnum}`;
  const ICSImproperRequest = `/api/calendar/ics?termCode=hello&courseIDs=${ids[0]}`;

  // Must be hardcoded to test calendar output
  // Spring '22 Intro SWE class must exist in test data
  const ICSRequest = `/api/calendar/ics?termCode=2222&courseIDs=50444`;
  const calendarIcsString =
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:qZoULkEYnvhZgzv1Qh70b
SUMMARY:Intro Software Eng
DTSTAMP:20220522T185500Z
DTSTART:20220328T080000
DTEND:20220328T090500
GEO:37;-122.06
LOCATION:J Baskin Engr 152
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20220603
END:VEVENT
END:VCALENDAR
`;

  test('responds with a 200 status code', async () => {
    await request
      .get(ICSRequest)
      .expect(200);
  });
  test('course has no meeting times (404)', async () => {
    await request
      .get(ICSRequestNoTimes)
      .expect(200);
  });
  test('responds with text/calendar data', async () => {
    await request
      .get(ICSRequest)
      .expect('Content-Type', 'text/calendar; charset=UTF-8');
  });
  test('validate calendar event data', async () => {
    const beginEvent = /BEGIN:VEVENT/g;
    const summary = /SUMMARY:Intro Software Eng/;
    const dtStart = /DTSTART:20220328/;
    const dtEnd = /DTEND:20220328/;
    const rrule = /RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20220603/;

    const numOfEvents = calendarIcsString.match(beginEvent);

    await request
      .get(ICSRequest)
      .expect('Content-Type', 'text/calendar; charset=UTF-8')
      .expect((res) => {
        expect(res.text.match(beginEvent)).toStrictEqual(numOfEvents);
        expect(summary.test(res.text)).toBe(true);
        expect(dtStart.test(res.text)).toBe(true);
        expect(dtEnd.test(res.text)).toBe(true);
        expect(rrule.test(res.text)).toBe(true);
      });
  });
  test('responds with 404 error for invalid term', async () => {
    const badCalReq = ICSRequest.replace(
      /termCode=\d+/g,
      'termCode=666',
    );
    await request
      .get(badCalReq)
      .expect(404);
  });
  test('responds with 404 error for invalid courseID', async () => {
    const badCalReq = `${ICSRequest}&courseIDs=helloworld`;
    await request
      .get(badCalReq)
      .expect(404);
  });
  test('responds with 400 error for incorrect request', async () => {
    await request
      .get(ICSImproperRequest)
      .expect(400);
  });
});
