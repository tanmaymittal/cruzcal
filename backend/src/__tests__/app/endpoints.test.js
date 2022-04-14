const supertest = require('supertest');
const http = require('http');
const app = require('../../app');

let server, request;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll(() => {
  server.close();
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


