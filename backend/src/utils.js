const tmp = require('tmp');
const fs = require('fs');
const path = require('path');

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
    subject: courseObj.subject,
    section: courseObj.section,
    coursenum: courseObj.coursenum,
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
    throw new exports.APIError(message, 404, []);
  }
  return exports.formatTerm(term);
};

exports.findCourse = async (termCode, courseID) => {
  const course = await getCourseByID(termCode, courseID);
  if (course === null) {
    const message = `courseID does not exist: ${courseID}`;
    throw new exports.APIError(message, 404, []);
  }
  return exports.formatCourse(course);
};


exports.generateScheduleURI = (type, term, courses) => {
  const termCodeStr = term.code === null ?
    '' : `termCode=${encodeURIComponent(term.code)}`;
  const courseIDsStr = courses.reduce(
    (prev, curr) => `${prev}&courseIDs=${encodeURIComponent(curr.courseID)}`,
    '',
  );
  return `/api/calendar/${type}?${termCodeStr}${courseIDsStr}`;
};

// data is either a string or a binary buffer
exports.createAndSendFile = async (res, filename, data) => {
  const extension = path.extname(filename);
  return new Promise((resolve, reject) => {
    tmp.file({postfix: extension}, (createError, path, fd, cleanupCallback) => {
      const cleanup = (err) => {
        cleanupCallback();
        if (err) reject(err);
      };

      if (createError) cleanup(createError);

      fs.writeFile(path, data, {encoding: 'utf8'}, (writeError) => {
        if (writeError) cleanup(writeError);

        // Send file download to client
        res.download(path, filename, (downloadError) => {
          if (downloadError) cleanup(downloadError);
          else cleanup();
        });
      });
    });
  });
};

