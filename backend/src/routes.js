const {generateIcsData} = require('./calendar');
const {createAndSendFile} = require('./utils');

const {
  getAllTerms,
  getUniqueSubjects,
  getAllCourses,
} = require('./db');

exports.getSubjects = async (req, res) => {
  const {term: termcode} = req.query;
  const conditions = termcode ? {termcode} : {};

  const subjects = (await getUniqueSubjects(conditions))
    .map(({subject}) => subject);

  if (subjects.length === 0) res.sendStatus(404);
  else res.json(subjects);
};

exports.getCourses = async (req, res) => {
  const {term: termcode, subject} = req.query;
  const conditions = {termcode, subject};

  const courses = (await getAllCourses(conditions)).map(formatCourse);

  if (courses.length === 0) res.sendStatus(404);
  else res.json(courses);
};

exports.getTerms = async (req, res) => {
  const terms = (await getAllTerms()).map(formatTerm);
  res.json(terms);
};

exports.genSchedule = async (req, res, next) => {
  try {
    const {type} = req.params;
    const {termCode, courseIDs} = req.body;
    const term = await findTerm(termCode);
    const courses = [];
    for (const courseID of courseIDs) {
      const course = formatCourse(await findCourse(term.code, courseID));
      courses.push(course);
    }
    const termCodeStr = termCode === null ?
      '' : `termCode=${encodeURIComponent(termCode)}`;
    const courseIDsStr = courseIDs.reduce(
      (prev, curr) => `${prev}&courseIDs=${encodeURIComponent(curr)}`,
      '',
    );

    const uri = `/api/calendar/${type}?${termCodeStr}${courseIDsStr}`;
    res.status(201).json({term, courses, uri});
  } catch (error) {
    next(error);
  }
};

exports.verifySchedule = async (req, res, next) => {
  try {
    const {termCode, courseIDs} = req.query;
    const term = await findTerm(termCode);
    const courses = [];
    for (const courseID of courseIDs) {
      const course = formatCourse(await findCourse(term.code, courseID));
      courses.push(formatCourse(course));
    }
    req.body = {term, courses};
    next();
  } catch (error) {
    next(error);
  }
};

// Returns 'text/calendar' file type
// Media type reference: https://www.iana.org/assignments/media-types/text/calendar
exports.genCalendar = async (req, res, next) => {
  try {
    const {term, courses} = req.body;
    const downloadName = 'calendar.ics';
    const icsData = generateIcsData(term, courses);
    await createAndSendFile(res, downloadName, icsData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Helpers
const formatCourse = (courseObj) => {
  const courseInfo = {
    name: courseObj.name,
    professor: courseObj.professor,
    lectures: courseObj.lectures,
    courseID: courseObj.refnum,
  };
  return courseInfo;
};

const formatTerm = (termObj) => {
  const termInfo = {
    code: termObj.code,
    name: termObj.name,
    date: {
      start: termObj.start,
      end: termObj.end,
    },
  };
  return termInfo;
};
