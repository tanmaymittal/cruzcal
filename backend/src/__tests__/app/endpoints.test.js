const supertest = require('supertest');
const http = require('http');
const app = require('../../app');
const {db} = require('../test-db');

let server, request;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  await db.sync({ force: true });
});

afterAll(async () => {
  server.close();
  db.close();
});

test('Invalid endpoint', async () => {
  await request.get('/hello/world').expect(res => {
    expect(res.status).not.toBe(200);
  })
});

// test('Check /terms', async () => {
//   await request.get('/terms').expect(200);
// });

// test('Check /schedule', async () => {
//   await request.post('/schedule')
//     .set('Content-type', 'application/json')
//     .send({
//       "termCode": 2222,
//       "courses": [{
//         "courseID": "50444"
//       }]
//     }).expect(200);
// });


