const express = require('express');
const http = require('http');
const { generateNewShortUrl, 
    handleGetAnalytics } = require('../controllers/url.controller.js');

const router = express.Router();

// generates a new short url which is in the form of
// example.com/randomid(poUirRdj)
router.post('/',generateNewShortUrl);

// to return the clicks for the provided url id
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;