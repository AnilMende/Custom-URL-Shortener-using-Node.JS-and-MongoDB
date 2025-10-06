const express = require('express');
const http = require('http');
const { generateNewShortUrl } = require('../controllers/url.controller');

const router = express.Router();

router.post('/',generateNewShortUrl);

module.exports = router;