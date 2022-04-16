const {ValidationError} = require('sequelize');
const {db, addCourse} = require('../../test-db');
const {record} = require('./common');

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

test('Insertion success', async () => {
  const validRecord = {...record};
  expect(await addCourse(validRecord)).toMatchObject(record);
});

test('Insertion validation error (missing field)', async () => {
  const invalidRecord = {...record};
  delete invalidRecord.CourseRefNum;

  await expect(addCourse(invalidRecord)).rejects.toThrow(ValidationError);
});
