
/**
 *
 */
exports.APIError = class APIError extends Error {
  /**
   *
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
