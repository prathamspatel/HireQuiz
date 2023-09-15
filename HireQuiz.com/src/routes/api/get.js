const logger = require('../../logger');
const { JobPosting } = require('../../model/posting');
const { createSuccessResponse, createErrorResponse } = require('../../response');

module.exports = async (req, res) => {
  try {
    logger.info('getting postings');

    var postings = await JobPosting.byUser(req.user);
    res.status(200).json(
      createSuccessResponse({
        postings: postings,
      })
    );
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error));
  }
};
