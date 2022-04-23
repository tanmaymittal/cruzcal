const axios = require('axios');
const { getAllTerms } = require('./db')

const slugSurvivalUrls = {
  AVAILABLE_TERMS: `https://andromeda.miragespace.net/slugsurvival/tracking/available`,
  ALL_TERMS_INFO: `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json`,
  SUBJECTS_BY_TERM: `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/:term.json`,
  COURSES_BY_TERM: `https://andromeda.miragespace.net/slugsurvival/data/fetch/courses/:term.json`,
};

exports.getTerms = async (req, res) => {
  res.json(await getAllTerms);
};

exports.genSchedule = async (req, res) => {
  const { termCode, courses } = req.body;
  try {
    const formattedCourses = await formatCourseDataAsync(termCode, courses);
    res.send(formattedCourses);

  } catch (err) {
    res.sendStatus(404);
  }
};

exports.genCalendar = async (req, res) => {};

// Helpers
const getIdentifierType = (identifier) => {
  identifier = identifier.toLowerCase();
  // Regex for subject and number, e.g. cse130, cse 130, cse 115a
  const subjectAndNumReg = /[a-z]{2,}[\s-]*?\d{1,3}[\s-]*?\w{1}?/;
  // Regex for course number, e.g. 70071
  const courseNumReg = /\d{5}/;
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
  const courseName = course.n;
  // Get the first professor for the course
  const professor = course.ins.d[0];
  const loct = course.loct[0];
  const location = loct.loc;
  const start = loct.t.time.start;
  const end = loct.t.time.end;

  const times = loct.t.day.map((c) => {
    return {
      day: c,
      start,
      end,
    };
  });
  const lectures = {
    location,
    times,
  };
  return {
    courseName,
    professor,
    lectures,
  };
};

const formatTermDataAsync = async (termCode) => {
  const termDataRes = await axios.get(slugSurvivalUrls.ALL_TERMS_INFO);
  const termData = termDataRes.data;
  const foundTerm = termData.find((t) => t.code === String(termCode));
  return {
    code: termCode,
    name: foundTerm.name,
    date: foundTerm.date,
  };
};

const formatFoundCourseDataAsync = async (courseIdentifiers, termCode) => {
  const courseStrings = courseIdentifiers.map((c) => c.courseID)
  const coursesSet = new Set(courseStrings);
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
  const courses = foundCourses.map((c) => processCourse(c));
  return courses;
};

const formatCourseDataAsync = async (termCode, courseIdentifiers) => {
  const term = await formatTermDataAsync(termCode);
  const courses = await formatFoundCourseDataAsync(courseIdentifiers, termCode);
  if (courses.length > 0) {
    return {
      code: 200,
      message: 'ok',
      term,
      courses,
    };
  } else {
    throw Error('No courses found for provided course identifiers');
  }
};
