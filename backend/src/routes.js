const axios = require('axios');

const slugSurvivalUrls = {
  AVAILABLE_TERMS: `https://andromeda.miragespace.net/slugsurvival/tracking/available`,
  ALL_TERMS_INFO: `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json`,
  SUBJECTS_BY_TERM: `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/:term.json`,
  COURSES_BY_TERM: `https://andromeda.miragespace.net/slugsurvival/data/fetch/courses/:term.json`,
};

exports.getTerms = async (req, res) => {
  const termsRes = await axios.get(slugSurvivalUrls.ALL_TERMS_INFO);
  const terms = termsRes.data;
  const formattedTerms = terms.map((term) => {
    return { code: term.code, name: term.name };
  });

  res.send(formattedTerms);
};

exports.genSchedule = async (req, res) => {
  const { termCode, courses } = req.body;
  const formattedCourseData = formatCourseData(termCode, courses);

  res.send({
    code: 200,
    message: 'ok',
    term: {
      code: 12345,
      name: 'Summer Quarter',
      date: {
        start: '4/15/22',
        end: '6/15/22',
      },
    },
    courses: [
      {
        courseName: 'Computational Models',
        professor: 'Professor Leonard',
        lectures: {
          location: 'Media Theatre 1',
          times: [
            {
              day: 'Monday',
              start: '09:50',
              end: '10:55',
            },
          ],
        },
      },
    ],
  });
};

exports.genCalendar = async (req, res) => {};

// Helpers
const getIdentifierType = (identifier) => {
  // Regex for subject and number, e.g. cse130 or cse 130
  const subjectAndNumReg = /[a-z]{2,}[ ]?\d{1,}/;
  // Regex for course number, e.g. 70071
  const courseNumReg = /^\d+$/;
  if (subjectAndNumReg.test(identifier)) {
    return 'subjectAndNum';
  } else if (courseNumReg.test(identifier)) {
    return 'courseNum';
  }
  return 'courseName';
};

const processIdentifier = (identifier) => {
  const identifierType = getIdentifierType(identifier);
  if (identifierType === 'subjectAndNum') {
    identifier = identifier.replace(/ /g, '');
  }
  return {
    identifier,
    identifierType,
  };
};

const processCourse = (course) => {
  return {
    courseName: course.n,
  }
};

// [
//   {
//     c: '10',
//     l: null,
//     n: 'Math Methods I',
//     s: '01',
//     cap: null,
//     ins: { d: [Array], f: 'Abram', l: 'Rodgers' },
//     num: 50716,
//     loct: [ [Object] ]
//   },
//   {
//     c: '30',
//     l: null,
//     n: 'SOE Calculus III',
//     s: '01',
//     cap: null,
//     ins: { d: [Array], f: 'David', l: 'Lee' },
//     num: 52295,
//     loct: [ [Object] ]
//   }
// ]

const formatCourseData = async (termCode, courses) => {
  const termDataRes = await axios.get(slugSurvivalUrls.ALL_TERMS_INFO);
  const termData = termDataRes.data;
  const foundTerm = termData.find((t) => t.code === String(termCode));
  const term = {
    code: termCode,
    name: foundTerm.name,
    date: foundTerm.date,
  };

  const coursesSet = new Set(courses);
  const courseDataRes = await axios.get(
    slugSurvivalUrls.SUBJECTS_BY_TERM.replace(':term', String(termCode))
  );
  const courseData = courseDataRes.data;
  let foundCourses = [];
  for (const subject in courseData) {
    const coursesToAdd = courseData[subject].filter((c) =>
      coursesSet.has(String(c['num']))
    );
    foundCourses = foundCourses.concat(coursesToAdd);
  }
  console.log(foundCourses);
};
