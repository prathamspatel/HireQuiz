const logger = require('../../logger');
const { JobApplication } = require('../../model/jobApplication');
const { createSuccessResponse, createErrorResponse } = require('../../response');

module.exports = async (req, res) => {
  try {
    logger.info('getting application');
    var application = await JobApplication.byUser(req.user);
    res.status(200).json(
      createSuccessResponse({
        applications: application,
      })
    );
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error));
  }
};
