// src/routes/api/index.js

const express = require('express');
const contentType = require('content-type');

const router = express.Router();

const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      const { type } = contentType.parse(req);
      if (type === 'application/json') {
        return true;
      }
    },
  });

router.post('/posting', rawBody(), require('./post'));

router.get('/posting', require('./get'));

router.get('/posting/:id', require('./getbyid'));

router.get('/application', require('./getApplication'));

router.post('/application', rawBody(), require('./postApplication'));

router.get('/application/:id', require('./getByIDApplication'));

router.get('/all', require('./getAll'));

module.exports = router;
