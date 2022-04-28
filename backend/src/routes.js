const {
  getAllTerms,
  getTermByCode,
  getCourseByID,
  getUniqueSubjects,
  getAllCourses,
} = require('./db');

exports.getSubjects = async (req, res) => {
  const {term: termcode} = req.query;
  const conditions = termcode ? {termcode} : {};

  const rows = await getUniqueSubjects(conditions);

  if (rows.length === 0) res.sendStatus(404);
  else res.json(rows.map(({subject}) => subject));
};

exports.getCourses = async (req, res) => {
  const {term: termcode, subject} = req.query;
  const conditions = {termcode, subject};

  const rows = await getAllCourses(conditions);

  if (rows.length === 0) res.sendStatus(404);
  else res.json(rows.map(formatCourse));
};

exports.getTerms = async (req, res) => {
  const terms = (await getAllTerms()).map(formatTerm);
  res.json(terms);
};

exports.genSchedule = async (req, res) => {
  const {termCode, courses} = req.body;
  const term = await getTermByCode(termCode);
  if (term == null) {
    return res.sendStatus(404);
  }
  const formattedTerm = formatTerm(term);
  const foundCourses = [];
  for (const course of courses) {
    const found = await getCourseByID(termCode, course.courseID);
    if (found == null) {
      return res.sendStatus(404);
    }
    const formattedCourse = formatCourse(found);
    foundCourses.push(formattedCourse);
  }
  res.status(201).json({term: formattedTerm, courses: foundCourses});
};

exports.genCalendar = async (req, res) => {};

// Helpers
const formatCourse = (courseObj) => {
  const courseInfo = {
    name: courseObj.name,
    professor: courseObj.professor,
    lectures: courseObj.lectures,
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

