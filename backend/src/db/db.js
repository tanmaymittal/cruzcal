const { Op, Model, IntegerDataType } = require('sequelize');

const getTermByCode = async (db, termCode) => {};

const getAllTerms = async (db) => {};

const getCourseByID = async (db, termCode, courseID) => {
  const { CourseInfo } = db.models;

  let crn = parseInt(courseID);
  if (isNaN(crn)) crn = -1;

  const results = await CourseInfo.findOne({
    where: {
      termcode: termCode,
      refnum: crn,
    },
  });
  return results;
};

module.exports = (db) => ({
  /**
   * @param {number} termCode - 4-digit UCSC term code
   * @param {String|number} courseID - 5-digit UCSC CRN (future versions will accept multiple formats)
   * @returns {Promise<Model|null>}
   */
  getCourseByID: async (termCode, courseID) =>
    getCourseByID(db, termCode, courseID),
  getTermByCode: async (code) => getTermByCode(db, termCode),
  getAllTerms: async (code) => getAllTerms(db),
});
