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
})

test('Check api docs', async () => {
  await request.get('/api-docs').expect(res => {
    expect(res.status).toBeLessThan(400);
  })
});

