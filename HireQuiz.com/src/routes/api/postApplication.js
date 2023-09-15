const response = require('../../response');
const { JobApplication } = require('../../model/jobApplication');
const logger = require('../../logger');
module.exports = async (req, res) => {
  logger.debug(`request to post a new application`);
  if (!Buffer.isBuffer(req.body)) {
    logger.warn(`unsupported media type`);
    return res.status(415).json(response.createErrorResponse(415, 'Unsupported Media Type'));
  }
  logger.debug('body of the user job application', req.user);

  const application = new JobApplication({
    ownerId: req.user,
    type: req.get('content-type'),
    // TODO: need to fix this before the server is considered working
    // job id is not fetching and is not being saved to the database
    jobPosting_id: req.params.job_id,
  });

  logger.info('saving the application to the database');
  await application.save();
  logger.info('setting the data of the application');
  await application.setData(req.body);
  logger.info('posting the application');
  res.setHeader('Content-type', application.type);
  res.setHeader(
    'Location',
    `${req.protocol}://${req.get('host')}/v1/application/${application.id}`
  );
  res.status(201).json(
    response.createSuccessResponse({
      status: 'ok',
      application: application,
    })
  );
};
