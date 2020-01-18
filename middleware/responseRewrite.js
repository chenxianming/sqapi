module.exports = (req, res, next) => {

    const wrap = (json) => (obj) => {

        req.csrfToken();
        obj['key'] = req.session.key;
        obj['timestamp'] = ((new Date()).getTime() - req.session.startTime) + ' (ms)';

        json(obj);
    }

    res.json = wrap(res.json.bind(res));

    next();
}