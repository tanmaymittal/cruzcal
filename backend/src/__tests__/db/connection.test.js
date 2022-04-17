const { db, getAllCourses } = require('../test-db');

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

test('Check DB connection', async () => {
  const { CourseInfo } = db.models;
  expect(CourseInfo.name).toBe('CourseInfo');

  const courses = await getAllCourses();
  expect(courses).toStrictEqual([]);
});
