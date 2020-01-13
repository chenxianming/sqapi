const xss = require('xss');

module.exports = function(req,res,next){
    
    for(var key in req.body){
        let val = req.body[key];
        req.body[key] = xss(val);
    }

    next();
    
}