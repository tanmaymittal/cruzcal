const { ValidationError, DatabaseError } = require('sequelize');
const {
  db,
  getAllCourses,
  getCourseByID,
  addTerm,
  addCourse,
} = require('../test-db');
const { terms, records } = require('../common');

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });
  // console.log(CourseInfo.getAttributes());

  for (const term of terms) {
    await addTerm(term);
  }
});

afterAll(async () => {
  await db.close();
});

// Run before any reads to load courses
test('Load CourseInfo', async () => {
  for (const record of records) {
    const row = await addCourse(record);
    expect(row).toMatchObject(record);
  }
});

test('Insertion invalid termcode fk', async () => {
  const invalidRecord = { ...records[0] };
  invalidRecord.termcode = -1;
  await expect(addCourse(invalidRecord)).rejects.toThrow(DatabaseError);
});

test('Insertion validation error (missing refnum)', async () => {
  const invalidRecord = { ...records[0] };
  delete invalidRecord.refnum;

  await expect(addCourse(invalidRecord)).rejects.toThrow(ValidationError);
});

test('Select *', async () => {
  const courses = await getAllCourses();
  expect(courses).toHaveLength(records.length);
});

test('Select by CRN and term', async () => {
  const record = records[0];
  const course = await getCourseByID(record.termcode, record.refnum);
  expect(course).toMatchObject(record);
});

test('Select invalid CRN and term', async () => {
  expect(await getCourseByID(0, 'not a course')).toBeNull();
});
