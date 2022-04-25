const {getAllTerms, getTermByCode, getCourseByID} = require('./db');
const fs = require('fs');
const {v4: uuid} = require('uuid');
const path = require('path');

exports.getTerms = async (req, res) => {
  res.json(await getAllTerms());
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
    const formattedCourse = formatCourse(found);
    if (found == null) {
      return res.sendStatus(404);
    }
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
    courseName: courseObj.name,
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

// eslint-disable-next-line no-unused-vars
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
