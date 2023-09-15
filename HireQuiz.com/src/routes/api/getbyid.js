// src/routes/api/getById.js
const { createErrorResponse } = require('../../response');
const { JobPosting } = require('../../model/posting');
const logger = require('../../logger');

module.exports = async (req, res) => {
  var id = req.params.id;
  try {
    logger.info('getting the posting using id');
    const posting = await JobPosting.byId(req.user, id);
    logger.info('getting posting data from database');
    var postingData = await posting.getData();

    logger.info('sending data');
    res.status(200).send(postingData);
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error));
  }
};
