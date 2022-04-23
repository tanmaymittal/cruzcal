const supertest = require('supertest');
const http = require('http');
const app = require('../../app');
const { db } = require('../test-db');
const { scheduleRequest, scheduleImproperFormatRequest } = require('./mockData');
const { courses, terms } = require('../common');

let server, request;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);

  await db.sync({ force: true });

  // for (const term of terms) {
  //   await addTerm(term);
  // }
  // for (const course of courses) {
  //   await addCourse(course);
  // }
});

afterAll(async () => {
  server.close();
  db.close();
});

test('Invalid endpoint', async () => {
  await request.get('/hello/world').expect((res) => {
    expect(res.status).not.toBe(200);
  });
});

describe('GET /terms', () => {
  test('responds with a 200 status code', async () => {
    await request.get('/terms').expect(200);
  });
  test('responds with JSON', async () => {
    await request.get('/terms').expect('Content-Type', /json/);
  });
});

describe('POST /schedule', () => {
  test('responds with a 200 status code', async () => {
    await request.post('/schedule').send(scheduleRequest).expect(200);
  });
  test('responds with JSON of courses', async () => {
    await request.post('/schedule').send(scheduleRequest).expect(200);
  });
  test('responds with 400 error for incorrectly formatted request', async () => {
    await request.post('/schedule').send(scheduleImproperFormatRequest).expect(400);
  });
});
