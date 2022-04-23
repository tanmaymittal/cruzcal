const {Op, Model} = require('sequelize');

const getCourseByID = async (db, termCode, courseID) => {
  const {CourseInfo} = db.models;

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
   * @param {object} term - term to add as a JSON object
   * @return {Promise<Model>} newly created row
   */
  addTerm: async (term) => await db.models.Term.create(term),
  /**
   * @param {object} course - course to add as a JSON object
   * @return {Promise<Model>} newly created row
   */
  addCourse: async (course) => await db.models.CourseInfo.create(course),
  /**
   * @return {Promise<Model[]>} All rows in CourseInfo table
   */
  getAllCourses: async () => await db.models.CourseInfo.findAll(),
  /**
   * @return {Promise<Model[]>} All rows in Term table
   */
  getAllTerms: async () => await db.models.Term.findAll(),
  /**
   * @param {number} code - term code for desired term
   * @return {Promise<Model|null>} Specified term or null if it doesn't exist.
   */
  getTermByCode: async (code) => await db.models.Term.findByPk(code),
  /**
   * @param {number} code - 4-digit UCSC term code
   * @param {String|number} courseID - 5-digit UCSC CRN (future versions will accept multiple formats)
   * @return {Promise<Model|null>} Specified course or null if it doesn't exist.
   */
  getCourseByID: async (code, courseID) => getCourseByID(db, code, courseID),
});
