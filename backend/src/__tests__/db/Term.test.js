require('dotenv').config();
const {db, addTerm, getTermByCode, getAllTerms} = require('../test-db');
const {terms} = require('../common');

beforeAll(async () => {
  // Reset database
  await db.sync({force: true});
  // console.log(CourseInfo.getAttributes());
});

afterAll(async () => {
  await db.close();
});

// Run before reads to load terms
test('Load Term', async () => {
  for (const term of terms) {
    const row = await addTerm(term);
    expect(row).toMatchObject(term);
  }
});

test('Select * Terms', async () => {
  const rows = await getAllTerms();
  expect(rows).toHaveLength(terms.length);
});

test('Select Term by Primary Key', async () => {
  const term = await getTermByCode(terms[0].code);
  expect(term).toMatchObject(terms[0]);
});

test('Select non-existent term', async () => {
  const term = await getTermByCode(0);
  expect(term).toBeNull();
});
