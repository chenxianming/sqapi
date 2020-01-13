const getIp = require('remote-ip');
const dateParse = require('../utils/dateParse');
const fs = require('fs');
const path = require('path');

const guestInfo = (req, res, next) => {

    try {
        let fileName = dateParse(new Date(), 'yyyy-MM-dd');

        let ip = getIp(req).replace(/f/g, '');
        ip = ip.replace(/\:/g, '');
        
        let url = req.url,
            method = req.method,
            date = (dateParse(new Date(), 'yyyy-MM-dd hh:mm:ss'));

        let result = `ip:${ip} url:${url} method:${method} date:${date} \n`;

        console.log(`${ method.toUpperCase() }:${url}  ${ date }`);

        fs.writeFileSync(`${ path.resolve() }/logs/${fileName}.log`, result, {
            flag: 'a'
        });
    } catch (e) {
        console.log(e);
    }

    next();
}

module.exports = guestInfo;