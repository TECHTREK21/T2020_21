const express = require('express');
const app = express();
const port = 3000;
const createError = require('http-errors');
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));

app.use('/login', require('./routes/login'));
app.use('/accounts', require('./routes/account'));
app.use('/messages', require('./routes/message'));

app.use(function (req, res, next) {
    console.log(`${req.method} -> ${req.originalUrl} is not a proper route!`);
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status).json({
        status: err.status,
        message: err.message
    });
})

app.listen(port, () => console.log(`App listening on port ${port}`));