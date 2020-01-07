const express = require('express');
const router = express.Router();
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const decimal = require('decimal.js');
const balanceQuery = require('../callers/balance');
const transactionQuery = require('../callers/transaction');

router.get('/current/:accountId', async function(req, res, next) {
    try {
        let currentBalance = await balanceQuery(req.params.accountId);

        res.json(currentBalance);
    } catch (err) {
        next(err);
    }
})

router.post('/history/:accountId', async function(req, res, next) {
    try {
        let start = moment(req.body.start, `YYYY-MM-DD`);
        let end = moment(req.body.end, `YYYY-MM-DD`);
        let transactions = await transactionQuery(req.params.accountId, start, end);

        let months = Array.from(moment.range(start, end).by(`months`)).map(m => m.format(`YYYY-MM`));
        let monthMap = new Map(months.map(m => [m, new decimal(0)]));
        let habitsMap = new Map();
        let totalCredit = new decimal(0);
        let totalDebit = new decimal(0);

        for (let transaction of transactions) {
            let amount = new decimal(transaction.amount);
            transaction.type === `DEBIT` ? totalDebit = totalDebit.add(amount) : totalCredit = totalCredit.add(amount);
            // parsing balance
            let balance = monthMap.get(moment(transaction.date).format(`YYYY-MM`));
            balance = transaction.type === `DEBIT` ? balance.sub(amount) : balance.add(amount);
            monthMap.set(moment(transaction.date).format(`YYYY-MM`), balance.toDP(2));
            // parsing transaction type
            let details = habitsMap.get(transaction.tag);
            if (details) {
                details.count++;
                transaction.type ===`DEBIT` ? details.debit = details.debit.add(amount).toDP(2) : details.credit = details.credit.add(amount).toDP(2);
            } else {
                habitsMap.set(transaction.tag, {
                    count: 1,
                    credit: transaction.type === `CREDIT` ? amount.toDP(2) : new decimal(0).toDP(2),
                    debit: transaction.type === `DEBIT` ? amount.toDP(2) : new decimal(0).toDP(2)
                })
            }
        }

        let summary = Array.from(monthMap.entries()).map(m => {
            return {
                month: m[0],
                change: m[1]
            }
        });

        let habits = Array.from(habitsMap.entries()).map(m => {
            return {
                tag: m[0],
                count: m[1].count,
                credit: m[1].credit.toFixed(2),
                debit: m[1].debit.toFixed(2),
                balance: m[1].credit.sub(m[1].debit).toDP(2).toFixed(2),
                debitPercent: m[1].debit.div(totalDebit).times(100).toFixed(2)
            }
        });
        
        let startBalanceDate = start.subtract(1, `month`);
        let startBalance = await balanceQuery(req.params.accountId, startBalanceDate);

        res.status(200).json({
            starting: startBalance.availableBalance,
            totalCredit: totalCredit.toFixed(2),
            totalDebit: totalDebit.toFixed(2),
            summary: summary,
            habits: habits,
            transactions: transactions
        });
    } catch (err) {
        next(err);
    }
});

router.get('/', async function (req, res, next) {
    try {

    } catch (err) {
        next(err);
    }
})

module.exports = router;