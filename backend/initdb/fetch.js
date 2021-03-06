const axios = require('axios');
const fs = require('fs');

const PAST_TERM_LIMIT = 5;

const convertDateString = (date) =>
  date.replace(
    /^(\d{2})\/(\d{2})\/(\d{2})$/g,
    (match, month, day, year) => `20${year}-${month}-${day}`,
  );

/*
  {
    data:
    [
      {
          code: '2224',
          date: { end: '08/26/22', start: '07/25/22' },
          name: '2022 Summer Quarter'
      },
    ]
  }
    */
const getTerms = async (limit) => {
  try {
    const url = 'https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json';

    const {data: terms} = await axios.get(url);
    return terms.map((term) => ({
      code: parseInt(term.code),
      name: term.name,
      start: convertDateString(term.date.start),
      end: convertDateString(term.date.end),
    })).slice(0, limit); // Only select last limit terms
  } catch (err) {
    console.error(err);
    return null;
  }
};

/*
  Structure of incoming json
  {
      CSE: [],
      YIDD: [
          {},
          {
              c: '3',
              l: null,
              n: 'First-Year Yiddish',
              s: '01',
              cap: null,
              ins: [Object],
              num: 65065,
              loct: [Array]
          }
      ]
  }
  */
const getCourses = async (termCode) => {
  try {
    const url = `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/${termCode}.json`;
    const {data: coursesByDept} = await axios.get(url);
    const result = [];

    const getRecurrence = (t) => {
      if (t === null || !(t?.day) || !(t?.time)) {
        return null;
      }
      return {days: t.day, time: t.time};
    };

    for (const dept of Object.getOwnPropertyNames(coursesByDept)) {
      for (const course of coursesByDept[dept]) {
        result.push({
          name: course.n,
          refnum: course.num,
          section: course.s,
          subject: dept,
          coursenum: course.c,
          professor: course.ins.d,
          lectures: course.loct.map(({t, loc}) => ({
            location: loc,
            recurrence: getRecurrence(t),
          })),
          termcode: parseInt(termCode),
        });
      }
    }
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Fetch the list of tracked terms and courses
module.exports = async function(db, reset) {
  const terms = await getTerms(PAST_TERM_LIMIT);

  let courses = [];
  for (const term of terms) {
    courses = courses.concat(await getCourses(term.code));
  }

  const res = {terms, courses};
  fs.writeFileSync('./static-db.json', JSON.stringify(res, null, 2));

  await db.sync({force: reset});
  await db.models.Term.bulkCreate(terms, {
    updateOnDuplicate: ['name', 'start', 'end'],
  });
  await db.models.CourseInfo.bulkCreate(courses, {
    updateOnDuplicate: [
      'name',
      'subject',
      'coursenum',
      'professor',
      'lectures',
    ],
  });
  await db.close();
};
