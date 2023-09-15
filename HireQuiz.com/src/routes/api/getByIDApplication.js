const { createErrorResponse } = require('../../response');
const { JobApplication } = require('../../model/jobApplication');
const logger = require('../../logger');

module.exports = async (req, res) => {
  var id = req.params.id;
  try {
    logger.info('getting the application data using id');
    const application = await JobApplication.byId(req.user, id);
    logger.info('getting posting data from database');
    var applicationData = await application.getData();

    logger.info('sending data');
    res.status(200).send(applicationData);
  } catch (error) {
    res.status(404).json(createErrorResponse(404, error));
  }
};
