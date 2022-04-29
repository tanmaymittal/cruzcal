const supertest = require('supertest');
const http = require('http');
const {db, addTerm, addCourse} = require('../test-db');
const app = require('../../app');
const {
  scheduleRequest,
  scheduleImproperFormatRequest,
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

describe('GET /terms', () => {
  test('responds with a 200 status code', async () => {
    await request.get('/api/terms').expect(200);
  });
  test('responds with JSON', async () => {
    await request.get('/api/terms').expect('Content-Type', /json/);
  });
});

describe('POST /schedule', () => {
  test('responds with a 200 status code', async () => {
    await request.post('/api/schedule').send(scheduleRequest).expect(201);
  });
  test('responds with JSON of courses', async () => {
    await request
      .post('/api/schedule')
      .send(scheduleRequest)
      .expect('Content-Type', /json/);
  });
  test('responds with 400 error for incorrect request', async () => {
    await request
      .post('/api/schedule')
      .send(scheduleImproperFormatRequest)
      .expect(400);
  });
});
