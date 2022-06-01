require('dotenv').config();
const {DatabaseError, UniqueConstraintError} = require('sequelize');
const {
  db,
  getAllCourses,
  getCourseByID,
  addTerm,
  addCourse,
} = require('../test-db');
const {terms, courses} = require('../common');

beforeAll(async () => {
  // Reset database
  await db.sync({force: true});
  // console.log(CourseInfo.getAttributes());

  for (const term of terms) {
    await addTerm(term);
  }

  // Load courses
  for (const course of courses) {
    const row = await addCourse(course);
    expect(row).toMatchObject(course);
  }
});

afterAll(async () => {
  await db.close();
});

// Assumption: negative termcode is invalid
test('Insert invalid termcode fk', async () => {
  const invalidRecord = {...courses[0]};
  invalidRecord.termcode = -1;
  await expect(addCourse(invalidRecord)).rejects.toThrow(DatabaseError);
});

test('Insert validation error (missing refnum)', async () => {
  const invalidRecord = {...courses[0]};
  delete invalidRecord.refnum;

  await expect(addCourse(invalidRecord)).rejects.toThrow(DatabaseError);
});

test('Insert duplicate key refnum,termcode', async () => {
  await expect(addCourse(courses[0])).rejects.toThrow(UniqueConstraintError);
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

test('Select invalid CRN, valid term', async () => {
  const firstCourse = courses[0];
  expect(await getCourseByID(firstCourse.termcode, 'not a course')).toBeNull();
});

test('Select valid CRN, invalid term', async () => {
  const firstCourse = courses[0];
  expect(await getCourseByID(0, firstCourse.refnum)).toBeNull();
});

test('Select invalid CRN, invalid term', async () => {
  expect(await getCourseByID(0, 'not a course')).toBeNull();
});
