
const index = async (req, res, next) => {
    
    console.log( req.body );
    
    return res.json({
        result: 'ok'
    });
}

module.exports = {
    index: index
}