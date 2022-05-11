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

exports.findAllTerms = () => {
  return (await getAllTerms()).map(formatTerm);
}

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
  const found = await getTermByCode(termCode);
  if (found == null) {
    const message = `Term does not exist: ${termCode}`;
    throw new APIError(message, 404, [message]);
  }
  return term;
};

exports.findCourse = async (termCode, courseID) => {
  const found = await getCourseByID(termCode, courseID);
  if (found === null) {
    const message = `courseID does not exist: ${courseID}`;
    throw new APIError(message, 404, [message]);
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
