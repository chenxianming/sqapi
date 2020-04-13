const setCustomHeaders = (req, res, next) => {

    //res.setHeader('Content-Security-Policy','upgrade-insecure-requests');
    res.setHeader('X-Server-Frame', 'sqapi');
    res.setHeader('Access-Control-Allow-Origin', '*'); // customize your FE host
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.setHeader("Access-Control-Allow-Headers","protobuf, token, key, Content-Type"); // for get method, pass token, key and Content-Type
    
    next();
}

module.exports = setCustomHeaders;
