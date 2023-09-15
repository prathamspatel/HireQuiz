// src/routes/index.js

const express = require('express');

const { authenticate } = require('../authorization/index');

const { version, author } = require('../../package.json');
const { hostname } = require('os');

const router = express.Router();

router.use(`/v1`, authenticate(), require('./api'));

router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({
    status: 'ok',
    author,
    githubUrl: 'https://github.com/parita-thakkar/hirequiz.com',
    version,
    // Include the hostname in the response
    hostname: hostname(),
  });
});

module.exports = router;
