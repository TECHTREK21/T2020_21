const rp = require('request-promise');
const token = require('../token.json');

module.exports = async function (customerId) {
    try {
        let options = {
            method: `GET`,
            uri: `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/${customerId}`,
            headers: {
                token: token.token,
                identity: token.identity
            },
            json: true
        }
    
        let result = await rp(options);
        return result;
    } catch (err) {
        throw err;
    }
}