// defined utils
const protoEncoder = require('../../utils/encodeProto');

const index = async (req, res, next) => {

    console.log('Received');
    console.log(req.body);

    // your data was decoded and put on req.body.data

    let response = {
        "result": true,
    }

    const resultBuf = new protoEncoder({
        json: require('./jsonExamples/response.json'),
        typeName: 'Response',
        original: response, // Your data here, the same format as './jsonExamples/response.json'
    });

    console.log('Send');
    console.log(resultBuf);

    return res.json(resultBuf);
}

module.exports = {
    index: index
}