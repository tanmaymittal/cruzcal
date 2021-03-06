const {generateIcsData, addGoogleCalApiEvents} = require('./calendar');
const {
  createAndSendFile,
  generateScheduleURI,
  findTerm,
  findCourse,
  formatTerm,
  formatCourse,
  APIError,
} = require('./utils');
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
      const course = await findCourse(term.code, courseID);
      courses.push(course);
    }
    const uri = generateScheduleURI(type, term, courses);
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
      const course = await findCourse(term.code, courseID);
      courses.push(course);
    }
    req.body = {term, courses};
    next();
  } catch (error) {
    next(error);
  }
};

exports.genJSON = async (req, res) => res.json(req.body);

// Returns 'text/calendar' file type
// Media type reference: https://www.iana.org/assignments/media-types/text/calendar
exports.genICS = async (req, res, next) => {
  try {
    const {term, courses} = req.body;
    const downloadName = 'calendar.ics';
    const icsData = generateIcsData(term, courses) || '';
    await createAndSendFile(res, downloadName, icsData);
  } catch (error) {
    next(error);
  }
};

exports.genGoogleCalendar = async (req, res, next) => {
  try {
    const {term, courses} = req.body;
    const {token} = req.user.creds;
    const {createdEvents} = await addGoogleCalApiEvents(token, term, courses);

    if (createdEvents.length === 0) {
      throw new APIError('No Google Calendar events created', 400, []);
    }

    res.status(200).send(createdEvents[0].data.htmlLink);
  } catch (error) {
    next(error);
  }
};
