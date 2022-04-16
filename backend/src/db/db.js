const { Op, Model } = require('sequelize');

const addCourse = async (db, courseData) => {
  const {CourseInfo} = db.models;
  return await CourseInfo.create(courseData);
}

const getCourseByID = async (db, termCode, courseID) => {
  const {CourseInfo} = db.models;
  const results = await CourseInfo.findOne({
    where: {
      [Op.or]: [
        {
          CourseRefNum: courseID
        }
      ]
    }
  });
  return results;
};


module.exports = (db) => ({
  /**
   * @param {Object} courseData - Course data, must have attributes for CourseInfo
   * @returns {Promise<Model|null>}
   */
  addCourse: async (course) => addCourse(db, course),
    /**
     * @param {String} termCode - 4-digit UCSC term code
     * @param {String} courseID - 5-digit UCSC CRN (future versions will accept multiple formats)
     * @returns {Promise<Model|null>}
     */
  getCourseByID: async (termCode, courseID) => getCourseByID(db, termCode, courseID),
});
