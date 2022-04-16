const { DatabaseError } = require('sequelize');
const { db, getCourseByID } = require('../../test-db');
const { terms, records } = require('../../common');

const { Term, CourseInfo } = db.models;

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });

  for (const term of terms) {
    await Term.create(term);
  }
  for (const record of records) {
    await CourseInfo.create(record);
  }
});

afterAll(async () => {
  await db.close();
});

test('Select success', async () => {
  const courses = await CourseInfo.findAll();
  expect(courses).toHaveLength(records.length);
  expect(courses[0]).toMatchObject(records[0]);
});

test('Select by CRN and term', async () => {
  const record = records[0];
  const course = await getCourseByID(record.termcode, record.refnum);
  expect(course).toMatchObject(record);
});

test('Select invalid CRN and term', async () => {
  expect(await getCourseByID(0, 'not a course')).toBeNull();
});

test('Select failure (invalid attr)', async () => {
  // CourseInfo doesn't contain a cake attribute
  expect(
    CourseInfo.findAll({
      where: {
        cake: true,
      },
    })
  ).rejects.toThrow(DatabaseError);
});
