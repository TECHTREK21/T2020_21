const express = require('express');
const router = express.Router();
const token = require('../token.json');
const rp = require('request-promise');
const sleep = require('system-sleep');
const moment = require('moment');
const messageQuery = require('../callers/messages');
const accountQuery = require('../callers/accounts');
const customerQuery = require('../callers/customer');

router.post('/', async function(req, res, next) {
    try {
        let loginOptions = {
            method: 'GET',
            uri: `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/${req.body.username}`,
            headers: {
                token: token.token,
                identity: token.identity
            },
            json: true
        }

        let login = await rp(loginOptions);

        let customer = await customerQuery(login.customerId);
        let accounts = await accountQuery(login.customerId);
        let messages = await messageQuery(login.customerId);
        let count = messages.filter(m => moment(m.dateCreated, `YYYY-MM-DD HH:mm:ss`).isAfter(moment(customer.lastLogin, `YYYY-MM-DD HH:mm:ss`))).length;
        sleep(1000);

        res.status(200).json(Object.assign(customer, { accounts: accounts, newMessages: count }));
    } catch (err) {
        let error = new Error(`Incorrect Username or Password`);
        error.status = 401;
        next(error);
    }
})

module.exports = router;