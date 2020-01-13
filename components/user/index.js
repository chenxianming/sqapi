let express = require('express');
let router = express.Router();

// automatic loop function
const service = require('./service')();

const fn = require('./fn');
const api = require('./api');

// any middleware here
// router.get('/', loginCheck);
router.get('/', fn.index);

// any middleware here
// router.post('/', keywordsFilter);
router.post('/', api.index);

module.exports = router;