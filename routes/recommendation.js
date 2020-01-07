const express = require('express');
const router = express.Router();
const recommendation = require('../recommendation.json');
const rp = require('request-promise');
const sleep = require('system-sleep')

router.post('/', async function(req, res, next) {
    try {

    } catch (err) {
        let error = new Error(`Incorrect Username or Password`);
        error.status = 401;
        next(error);
    }
})

module.exports = router;