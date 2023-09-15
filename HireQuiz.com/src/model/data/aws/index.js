const logger = require('../../../logger');

const s3Client = require('./s3Client');
const ddbDocClient = require('./ddbDocClient');

const { PutCommand, GetCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });

// Write metadata to memory db. Returns a Promise
function writePosting(posting) {
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    Item: posting,
  };

  const command = new PutCommand(params);

  try {
    return ddbDocClient.send(command);
  } catch (err) {
    logger.warn({ err, params, posting }, 'error writing posting to DynamoDB');
    throw err;
  }
}

// Read a metadata from memory db. Returns a Promise
async function readPosting(ownerId, id) {
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    Key: { ownerId, id },
  };

  const command = new GetCommand(params);

  try {
    const data = await ddbDocClient.send(command);

    return data?.Item;
  } catch (err) {
    logger.warn({ err, params }, 'error reading posting from DynamoDB');
    throw err;
  }
}

// Write a data buffer to memory db. Returns a Promise
async function writePostingData(ownerId, id, data) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${ownerId}/${id}`,
    Body: data,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
  } catch (err) {
    const { Bucket, Key } = params;
    logger.error({ err, Bucket, Key }, 'Error uploading posting data to S3');
    throw new Error('unable to upload posting data');
  }
}

// Read a data from memory db. Returns a Promise
async function readPostingData(ownerId, id) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${ownerId}/${id}`,
  };

  const command = new GetObjectCommand(params);

  try {
    const data = await s3Client.send(command);
    return streamToBuffer(data.Body);
  } catch (err) {
    const { Bucket, Key } = params;
    logger.error({ err, Bucket, Key }, 'Error streaming posting data from S3');
    throw new Error('unable to read posting data');
  }
}

// Get a list of postings ids/objects for the given user from memory db. Returns a Promise
async function listPostings(ownerId, expand = false) {
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    KeyConditionExpression: 'ownerId = :ownerId',
    ExpressionAttributeValues: {
      ':ownerId': ownerId,
    },
  };
  if (!expand) {
    params.ProjectionExpression = 'id';
  }

  const command = new QueryCommand(params);

  try {
    const data = await ddbDocClient.send(command);
    return !expand ? data?.Items.map((item) => item.id) : data?.Items;
  } catch (err) {
    logger.error({ err, params }, 'error getting all postings for user from DynamoDB');
    throw err;
  }
}

module.exports.listPostings = listPostings;
module.exports.writePosting = writePosting;
module.exports.readPosting = readPosting;
module.exports.writePostingData = writePostingData;
module.exports.readPostingData = readPostingData;
