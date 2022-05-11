const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const {
  getTermByCode,
  getCourseByID,
} = require('./db');

exports.APIError = class APIError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   * @param {string[]} errors
   */
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
};

// Helpers
exports.formatCourse = (courseObj) => {
  const courseInfo = {
    name: courseObj.name,
    professor: courseObj.professor,
    lectures: courseObj.lectures,
    courseID: courseObj.refnum,
  };
  return courseInfo;
};

exports.formatTerm = (termObj) => {
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

exports.findTerm = async (termCode) => {
  const term = await getTermByCode(termCode);
  if (term == null) {
    const message = `Term does not exist: ${termCode}`;
    throw new APIError(message, 404, []);
  }
  return term;
};

exports.findCourse = async (termCode, courseID) => {
  const course = await getCourseByID(termCode, courseID);
  if (course === null) {
    const message = `courseID does not exist: ${courseID}`;
    throw new APIError(message, 404, []);
  }
  course.lectures.forEach((lec) => {
    if (lec.times.length === 0) {
      throw new APIError('No meeting times', 400, [{
        message: 'Course has no meeting times',
        course,
      }]);
    }
  });
  return course;
};


exports.generateScheduleURI = (type, term, courses) => {
  const termCodeStr = term.code === null ?
    '' : `termCode=${encodeURIComponent(term.code)}`;
  const courseIDsStr = courseIDs.reduce(
    (prev, curr) => `${prev}&courseIDs=${encodeURIComponent(curr.courseID)}`,
    '',
  );
  return `/api/calendar/${type}?${termCodeStr}${courseIDsStr}`;
};

// data is either a string or a binary buffer
exports.createAndSendFile = async (res, filename, data) => {
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
