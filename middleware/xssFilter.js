const xss = require('xss');
const obj2array = require('obj2array');

module.exports = function(req,res,next){
    
    let data = req.body.data || null;
    
    if( !data ){
        return next();
    }
    
    obj2array(data, function (val, idx) {
        // map each value and replace to xss security value
        let str = typeof val === 'string',
            value = str ? `"${ xss( val ) }"` : xss( val );
            
        eval( `req.body.data${ idx } = ${ value }` );
    });

    next();
    
}