const response = require('../../response');
const { JobPosting } = require('../../model/posting');
const logger = require('../../logger');
module.exports = async (req, res) => {
  logger.debug(`POST /v1/postings called`);
  if (!Buffer.isBuffer(req.body)) {
    logger.warn(`POST /v1/postings - Body requires correct data that is supported`);
    return res
      .status(415)
      .json(
        response.createErrorResponse(
          415,
          'Unsupported Media Type: Body requires correct posting data that is supported'
        )
      );
  }
  logger.debug('body of the user posting', req.user);

  const posting = new JobPosting({
    ownerId: req.user,
    type: req.get('content-type'),
  });

  logger.info('saving the posting data to the database');
  await posting.save();
  logger.info('setting the posting data');
  await posting.setData(req.body);
  logger.info('posting the posting data to the database');
  res.setHeader('Content-type', posting.type);
  res.setHeader('Location', `${req.protocol}://${req.get('host')}/v1/posting/${posting.id}`);
  res.status(201).json(
    response.createSuccessResponse({
      status: 'ok',
      posting: posting,
    })
  );
};
