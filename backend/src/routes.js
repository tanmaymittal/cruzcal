const fs = require('fs');
const {v4: uuid} = require('uuid');
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

// data is either a string or a binary buffer
const createAndSendFile = async (res, filename, data) => {
  return new Promise((resolve, reject) => {
    const tmpfile = path.join('/tmp', `cc-${uuid()}`);
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
    const downloadName = 'calendar.txt';
    const data = JSON.stringify(await getAllTerms(), null, 2);
    await createAndSendFile(res, downloadName, data);
  } catch (error) {
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
