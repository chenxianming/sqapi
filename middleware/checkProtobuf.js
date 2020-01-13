const json2proto = require('../utils/json2proto');

module.exports = function (req, res, next) {
    
    let protoBuf = req.body['protoBuf'] || req.headers['protoBuf'] || null;
    
    if( !protoBuf ){
        return res.json({
            errMsg: 'you need to passed a protoBuf array.'
        });
    }
    
    try{
        let json = JSON.parse( req.body.protoBuf );
    }catch(e){
        return {
            errMsg: 'invalid protoBuf format'
        }
    }
    
    next();
}