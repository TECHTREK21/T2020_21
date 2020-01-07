const rp = require('request-promise');
const token = require('../token.json');
const moment = require('moment');

module.exports = async function (accountId, start, end) {
    try {
        let options = {
            method: "GET",
            uri: `http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/${accountId}?from=${start.format(`MM-DD-YYYY`)}&to=${end.format(`MM-DD-YYYY`)}`,
            headers: {
                token: token.token,
                identity: token.identity
            },
            json: true
        }
    
        let result = await rp(options);
        return result.map(t => {
            return {
                transactionId: t.transactionId,
                accountId: t.accountId,
                type: t.type,
                amount: t.amount,
                date: moment(t.date, `YYYY-MM-DDTHH:mm:ss`).format(`YYYY-MM-DD HH:mm:ss`),
                tag: t.tag,
                referenceNumber: t.referenceNumber
            }
        }).sort((a, b) => {
            if (moment(a.date).isAfter(moment(b.date))) {
                return -1;
            }
            return 1;
        });
    } catch (err) {
        throw err;
    }
}