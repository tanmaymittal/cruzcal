const { db } = require('../test-db');

const CourseInfo = db.models.CourseInfo;

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

test('Check DB connection', async () => {
  expect(CourseInfo.name).toBe('CourseInfo');
  const courses = await CourseInfo.findAll();
  expect(courses).toStrictEqual([]);
});
