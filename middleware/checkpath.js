
const checkPath = ( req, res, next ) => {
    
    let filter404 = true;
    
    req.app._router.stack.forEach( ( stack ) => {
        if( stack.name == 'router' ){
            stack.handle.stack.forEach( ( p ) => {
                ( p.match( req.url ) ) && ( filter404 = false );
            } );
        }
    } );
    
    if( filter404 ){
        let err = new Error('Not Found');
        err.status = 404;
        res.status(err.status || 500);
        
        return res.json({
            errMsg: err.message
        });
    }
    
    next();
}

module.exports = checkPath;