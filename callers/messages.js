const rp = require('request-promise');
const token = require('../token.json');
const moment = require('moment');

module.exports = async function (customerId) {
    try {
        let options = {
            method: `GET`,
            uri: `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/message/${customerId}`,
            headers: {
                token: token.token,
                identity: token.identity
            },
            json: true
        }
    
        let result = await rp(options);
        return result.map(m => {
            return {
                dateCreated: moment(m.dateCreated, `YYYY-MM-DDTHH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`),
                summary: m.summary,
                subject: m.subject,
                body: m.body,
                type: m.type
            }
        }).sort((a, b) => {
            if (moment(a.dateCreated).isAfter(moment(b.dateCreated))) {
                return -1;
            }
            return 1;
        });
    } catch (err) {
        throw err;
    }
}