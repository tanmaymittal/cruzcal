const {DatabaseError} = require('sequelize');
const {db, getCourseByID} = require('../../test-db');
const {record} = require('./common');

const CourseInfo = db.models.CourseInfo;

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });

  // Insert record to query
  await CourseInfo.create(record);
});

afterAll(async () => {
  await db.close();
});

test('Select success', async () => {
  const courses = await CourseInfo.findAll();
  expect(courses).toHaveLength(1);
  expect(courses[0]).toMatchObject(record);
});

test('Select by CRN and term', async () => {
  const course = await getCourseByID(record.Term.code, record.CourseRefNum);
  expect(course).toMatchObject(record);
});

test('Select invalid CRN and term', async () => {
  expect(await getCourseByID('0000', '00000')).toBeNull();
});

test('Select failure (missing attr)', async () => {
  // CourseInfo doesn't contain a cake attribute
  expect(CourseInfo.findAll({
    where: {
      cake: true
    }
  })).rejects.toThrow(DatabaseError);
});

