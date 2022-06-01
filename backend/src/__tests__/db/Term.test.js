require('dotenv').config();
const {db, addTerm, getTermByCode, getAllTerms} = require('../test-db');
const {terms} = require('../common');
const {DatabaseError, UniqueConstraintError} = require('sequelize');

beforeAll(async () => {
  // Reset database
  await db.sync({force: true});

  // Load terms
  for (const term of terms) {
    const row = await addTerm(term);
    expect(row).toMatchObject(term);
  }
});

afterAll(async () => {
  await db.close();
});

test('Insert duplicate key termcode', async () => {
  await expect(addTerm(terms[0])).rejects.toThrow(UniqueConstraintError);
});

test('Insert term with incorrect attribute type', async () => {
  const term = {...terms[0], code: 'string-code'};
  await expect(addTerm(term)).rejects.toThrow(DatabaseError);
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
