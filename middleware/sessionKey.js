const uuidv4 = require('uuid/v4');
const config = require('../config');

const getCodeByGuid = (guid, mapKey, mapPramas) => {

    const timestamp = (new Date().getTime()).toString();

    let timestampArr = timestamp.split('');

    timestampArr.forEach((time, idx) => {
        (timestampArr[idx] = mapPramas.indexOf(time));
    });

    var results = [],
        guid = guid.toLocaleLowerCase(),
        arr = guid.split('');

    var arr2 = mapPramas.split('');

    arr2.forEach((data) => {
        results.push(guid.indexOf(data));
    });

    var str = results.join('');
    str = str.replace(/-/g, '');

    return str + '10466' + timestampArr.join('');
}

const decodeTimeStamp = (key, mapPramas) => {

    if (!key) {
        return '';
    }

    let time = key.match(/10466(.*)/);

    if (!time) {
        return '';
    }

    time = time[1];

    let timeArr = time.split(''),
        rs = [];

    timeArr.forEach((r, idx) => {
        rs[idx] = mapPramas[r];
    });

    return rs.join('') * 1;
}

const csrf = function (req, res, next) {
    
    const cerToken = req.body['token'] || req.headers['token'] || null,
        cerKey = req.body['key'] || req.headers['key'] || null;
    
    const mapKey = config.mapKey,
        mapPramas = '1876540239';

    const sessionToken = (req.session && req.session.key) ? req.session.key.token : null;

    req.csrfToken = () => {

        let csrf = uuidv4(),
            key = getCodeByGuid(csrf, mapKey, mapPramas);

        let token = {
            token: csrf,
            key: key
        };

        req.session.key = token;

        return token;
    }
    
    if ( ( cerToken != sessionToken ) && ( cerToken != null ) ) {
        return res.json({
            errMsg: 'invalid token',
            key: req.session.key
        });
    }

    let timestamp = decodeTimeStamp(cerKey, mapPramas);
    
    if( ( ( new Date().getTime() - timestamp ) / 1000 / 60 ) > config.tokenExpireTime ){
        return res.json({
            errMsg:'token was expired, please try again.',
            key: req.session.key
        });
    }

    next();
}

module.exports = csrf;