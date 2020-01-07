const express = require('express');
const router = express.Router();
const messageQuery = require('../callers/messages');

router.get('/:customerId', async function(req, res, next) {
    try {
        let messages = await messageQuery(req.params.customerId);
        res.json(messages);
    } catch (err) {
        let error = new Error(`Incorrect Username or Password`);
        error.status = 401;
        next(error);
    }
})

module.exports = router;