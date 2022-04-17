const { Op, Model } = require('sequelize');

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
  addTerm: async (term) => await db.models.Term.create(term),
  addCourse: async (course) => await db.models.CourseInfo.create(course),
  getTermByCode: async (code) => await db.models.Term.findByPk(code),
  getAllTerms: async () => await db.models.Term.findAll(),
  /**
   * @param {number} termCode - 4-digit UCSC term code
   * @param {String|number} courseID - 5-digit UCSC CRN (future versions will accept multiple formats)
   * @returns {Promise<Model|null>}
   */
  getCourseByID: async (code, courseID) => getCourseByID(db, code, courseID),
});
