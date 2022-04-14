const db = require('../../db');

const CourseInfo = db.models.CourseInfo;

beforeAll(async () => {
  await db.sync({ force: true });
});

test('Check DB connection', async () => {
  expect(CourseInfo.name).toBe('CourseInfo');
  const courses = await CourseInfo.findAll();
  expect(courses).toStrictEqual([]);
});
