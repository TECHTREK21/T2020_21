const rp = require('request-promise');
const token = require('../token.json');
const moment = require('moment')

module.exports = async function (customerId) {
    try {
        let options = {
            method: `GET`,
            uri: `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/${customerId}/details`,
            headers: {
                token: token.token,
                identity: token.identity
            },
            json: true
        }
    
        let result = await rp(options);

        result.lastLogIn = moment(result.lastLogIn, `YYYY-MM-DDTHH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`);
        result.dateOfBirth = moment(result.dateOfBirth, `YYYY-MM-DDTHH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`);
        return result;
    } catch (err) {
        throw err;
    }
}