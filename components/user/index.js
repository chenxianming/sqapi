let express = require('express');
let router = express.Router();

// automatic loop function
const service = require('./service')();

const fn = require('./fn');
const api = require('./api');

// defined utils
const protoDecoder = require('../../utils/decodeProto');

const indexProtobuf = new protoDecoder({
    json: require('./jsonExamples/login.json'),
    typeName: 'Index'
});

// defined middleware
const xssFilter = require('../../middleware/xssFilter');


// GET ROUTER =========================
// any middleware here
// router.get('/', loginCheck);

router.get('/', fn.index);


// POST ROUTER ========================
router.post('/', indexProtobuf.middleware); // decode protobuf array to data
router.post('/', xssFilter); // xss filter

// any middleware here
// router.post('/', senstifyWord);

router.post('/', api.index);

module.exports = router;