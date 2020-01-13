let express = require('express');
let router = express.Router();

// automatic loop function
const service = require('./service')();

const fn = require('./fn');
const api = require('./api');

const protoEncoder = require('../../utils/encodeProto');
const protoDecoder = require('../../utils/decodeProto');

const indexProtobufMiddle = new protoDecoder({
    json: require('./jsonExamples/login.json'),
    typeName: 'Index'
});

// any middleware here
// router.get('/', loginCheck);

router.get('/', fn.index);


router.post('/', indexProtobufMiddle.middleware); // decode protobuf array to data

// any middleware here
// router.post('/', senstifyWord);
router.post('/', api.index);

module.exports = router;