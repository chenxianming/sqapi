module.exports = function (req, res, next) {
    
    req.session.startTime = ( new Date() ).getTime();
    
    next();
}