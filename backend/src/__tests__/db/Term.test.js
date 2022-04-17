const { db, addTerm, getTermByCode } = require('../test-db');
const { terms } = require('../common');

const { Term } = db.models;

beforeAll(async () => {
  // Reset database
  await db.sync({ force: true });
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

test('Select Term by Primary Key', async () => {
  const term = await getTermByCode(terms[0].code);
  expect(term).toMatchObject(terms[0]);
});
