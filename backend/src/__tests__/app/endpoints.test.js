const supertest = require('supertest');
const http = require('http');
const {db, addTerm, addCourse} = require('../test-db');
const app = require('../../app');
const {
  scheduleRequest,
  scheduleImproperFormatRequest,
  calendarICSRequest,
  calendarICSImproperRequest,
  calendarIcsString,
  JSONRequestNoTimes,
  ICSRequestNoTimes,
} = require('./mockData');
const {courses, terms} = require('../common');

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
      .expect(200)
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

describe('POST /schedule/json', () => {
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
  test('Course has no meeting times', async () => {
    await request
      .get(JSONRequestNoTimes)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => console.log('MESSAGE:', res.body.message));
  });
});

describe('GET /api/calendar/ics', () => {
  test('responds with a 200 status code', async () => {
    await request
      .get(calendarICSRequest)
      .expect(200);
  });
  test('Course has no meeting times', async () => {
    await request
      .get(ICSRequestNoTimes)
      .expect(400)
      .expect((res) => expect(res.body.message).toBe('No meeting times'));
  });
  test('responds with text/calendar data', async () => {
    const beginEventMatch = /BEGIN:VEVENT/g;
    const numOfEvents = calendarIcsString.match(beginEventMatch);

    await request
      .get(calendarICSRequest)
      .send(calendarICSRequest)
      .expect('Content-Type', 'text/calendar; charset=UTF-8')
      .expect((res) => {
        expect(res.text.match(beginEventMatch)).toStrictEqual(numOfEvents);
      });
  });
  test('responds with 404 error for invalid term', async () => {
    const badCalReq = calendarICSRequest.replace(
      /termCode=\d+/g,
      'termCode=666',
    );
    await request
      .get(badCalReq)
      .expect(404);
  });
  test('responds with 404 error for invalid courseID', async () => {
    const badCalReq = `${calendarICSRequest}&courseIDs=helloworld`;
    await request
      .get(badCalReq)
      .expect(404);
  });
  test('responds with 400 error for incorrect request', async () => {
    await request
      .get(calendarICSImproperRequest)
      .expect(400);
  });
});
