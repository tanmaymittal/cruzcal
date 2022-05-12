const fs = require('fs');
const {v4: uuid} = require('uuid');
const {generateIcsData} = require('./calendar');
const path = require('path');

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
  const {
    formattedTerm,
    formattedCourses,
  } = await formatTermAndCourses(res, termCode, courses);

  res.status(201).json({term: formattedTerm, courses: formattedCourses});
};

// data is either a string or a binary buffer
const createAndSendFile = async (res, filename, data) => {
  return new Promise((resolve, reject) => {
    const tmpfile = path.join('/tmp', `cc-${uuid()}.ics`);
    // Create temporary file
    fs.writeFile(tmpfile, data, (writeError) => {
      if (writeError) {
        reject(new Error('could not create temporary file'));
      }
      // Send file download to client
      res.download(tmpfile, filename, (downloadError) => {
        if (downloadError) {
          reject(new Error('response download failed'));
        }
        // Remove temporary file
        fs.unlink(tmpfile, (err) => {
          if (err) reject(new Error('temporary file failed to delete'));
          else resolve();
        });
      });
    });
  });
};

// Returns 'text/calendar' file type
// Media type reference: https://www.iana.org/assignments/media-types/text/calendar
exports.genCalendar = async (req, res, next) => {
  try {
    const {termCode, courses} = req.body;
    const {
      formattedTerm,
      formattedCourses,
    } = await formatTermAndCourses(res, termCode, courses);
    const downloadName = 'calendar.ics';
    const icsData = generateIcsData(formattedTerm, formattedCourses);
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

const formatTermAndCourses = async (res, termCode, courses) => {
  const term = await getTermByCode(termCode);
  if (term == null) {
    return res.sendStatus(404);
  }
  const formattedTerm = formatTerm(term);
  const formattedCourses = [];
  for (const course of courses) {
    const found = await getCourseByID(termCode, course.courseID);
    if (found == null) {
      return res.sendStatus(404);
    }
    const formattedCourse = formatCourse(found);
    formattedCourses.push(formattedCourse);
  }
  return {formattedTerm, formattedCourses};
};
