const supertest = require('supertest');
const http = require('http');

require('dotenv').config();
require('../test-db');

const auth = require('../../auth');
const sinon = require('sinon');

// references to original middleware
const realAuthCheck = auth.check;

// middleware stubs; specify intended handler (real/fake) in test function
sinon.stub(auth, 'check');

// App now relies on stubbed middleware
const app = require('../../app');

let server; let request;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll(() => {
  server.close();
});

test('Check api docs exists', async () => {
  await request.get('/api/docs').expect((res) => {
    expect(res.status).toBeLessThan(400);
  });
});

test('Invalid endpoint', async () => {
  await request.get('/api/hello/world').expect((res) => {
    expect(res.status).toBe(404);
  });
});

test('Check api version is a number', async () => {
  await request.get('/api/version/latest')
    .expect('Content-Type', /text/)
    .expect((res) => {
      const version = Number(res.text);
      expect(version).not.toBe(NaN);
    });
});

test('Check unauthenticated user', async () => {
  auth.check.callsFake(realAuthCheck);
  await request.get('/api/auth/check').expect(401);
});

test('Check authenticated user', async () => {
  auth.check.callsFake((req, res, next) => next());
  await request.get('/api/auth/check')
    .expect(200);
});

test('Check user logout redirect', async () => {
  await request.post('/api/logout')
    .expect(302)
    .expect(({headers}) => expect(headers.location).toBe('/'));
});


