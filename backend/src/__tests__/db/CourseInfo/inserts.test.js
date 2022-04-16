const { ValidationError } = require('sequelize');
const { db } = require('../../test-db');
const { terms, records } = require('../../common');

const { CourseInfo, Term } = db.models;

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });

  for (const term of terms) {
    await Term.create(term);
  }
});

afterAll(async () => {
  await db.close();
});

test('Insertion success', async () => {
  const validRecord = { ...records[0] };
  const row = await CourseInfo.create(validRecord);
  expect(row).toMatchObject(records[0]);
});

test('Insertion validation error (missing field)', async () => {
  const invalidRecord = { ...records[0] };
  delete invalidRecord.refnum;

  await expect(CourseInfo.create(invalidRecord)).rejects.toThrow(
    ValidationError
  );
});
