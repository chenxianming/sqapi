const xss = require('xss');
const obj2array = require('../utils/obj2array');
const jsonParser = obj2array.jsonParser;

module.exports = function(req,res,next){
    let data = req.body.data || null;
    
    if( !data ){
        return next();
    }
    
    jsonParser(data, function (val, idx) {
        // map each value and replace to xss security value
        
        if( ( typeof( val ) != 'string' ) ){
            return ;
        }
        
        if( !val ){
            return ;
        }
        
        let value = xss( val );
        eval( `req.body.data${ idx } = "${ value }";` );
    });
    
    obj2array.reset();

    next();
    
}