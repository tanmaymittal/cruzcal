const { ValidationError, DatabaseError } = require('sequelize');
const {
  db,
  getAllCourses,
  getCourseByID,
  addTerm,
  addCourse,
} = require('../test-db');
const { terms, courses } = require('../common');

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
  for (const course of courses) {
    const row = await addCourse(course);
    expect(row).toMatchObject(course);
  }
});

// Assumption: negative termcode is invalid
test('Insertion invalid termcode fk', async () => {
  const invalidRecord = { ...courses[0] };
  invalidRecord.termcode = -1;
  await expect(addCourse(invalidRecord)).rejects.toThrow(DatabaseError);
});

test('Insertion validation error (missing refnum)', async () => {
  const invalidRecord = { ...courses[0] };
  delete invalidRecord.refnum;

  await expect(addCourse(invalidRecord)).rejects.toThrow(ValidationError);
});

test('Select *', async () => {
  const allCourses = await getAllCourses();
  expect(allCourses).toHaveLength(courses.length);
});

test('Select by CRN and term', async () => {
  const firstCourse = courses[0];
  const course = await getCourseByID(firstCourse.termcode, firstCourse.refnum);
  expect(course).toMatchObject(firstCourse);
});

test('Select invalid CRN and term', async () => {
  expect(await getCourseByID(0, 'not a course')).toBeNull();
});
