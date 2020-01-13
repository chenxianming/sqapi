const setCustomHeaders = (req, res, next) => {

    //res.setHeader('Content-Security-Policy','upgrade-insecure-requests');

    next();
}

module.exports = setCustomHeaders;