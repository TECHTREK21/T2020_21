const rp = require('request-promise');
const token = require('../token.json');

module.exports = async function (accountId, date) {
    try {
        let options = {
            method: "GET",
            headers: {
                token: token.token,
                identity: token.identity
            },
            json: true
        }
        options.uri = date ? 
            `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/${accountId}/balance?month=${Number(date.format(`M`))-1}&year=${date.format(`YYYY`)}` : 
            `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/${accountId}/balance`;
    
        let result = await rp(options);
        return result;
    } catch (err) {
        throw err;
    }
}