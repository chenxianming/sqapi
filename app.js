const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

//requires
const RateLimit = require('express-rate-limit');
const appendToLog = require('./middleware/guestlog');
const startTime = require('./middleware/startTime');

// utils
const ranstr = require('./utils/ranstr');

//defined middleware
const customHeaders = require('./middleware/customHeaders');
const responseRewrite = require('./middleware/responseRewrite');
const sessionKey = require('./middleware/sessionKey');
const checkProtobuf = require('./middleware/checkProtobuf');


// =================================================
// defined routes here
const user = require('./components/user');


let app = express();

app.use(bodyParser.json({
    limit: '20mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

// put your static files here
app.use(express.static(path.join(__dirname, 'htdocs')));

// defined session
const session = require('express-session');

app.use(session({
    secret: ranstr(20),
    resave: false,
    saveUninitialized: true,
}));

// defined request limiter
let limiter = new RateLimit({
    windowMs: 1000, // 1000 ms
    max: 5, // limit each IP to 100 requests per windowMs 
    delayMs: 0, // disable delaying - full speed until the max limit is reached 
    message: `Too many accounts created from this IP, please try again after an hour`
});

app.enable("trust proxy");

// middleware
app.use(startTime);
app.use(limiter);
app.use(customHeaders);
app.use(responseRewrite);
app.use(sessionKey);
app.use(checkProtobuf);

//set guest middleware
app.use(appendToLog);

// =================================================
// bind route handles here
app.use('/', user);


// err middleware
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errMsg: err.message
    });
});


module.exports = app;