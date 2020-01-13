const setCustomHeaders = (req, res, next) => {

    //res.setHeader('Content-Security-Policy','upgrade-insecure-requests');
    res.setHeader('X-Server-Frame', 'sqapi');

    next();
}

module.exports = setCustomHeaders;