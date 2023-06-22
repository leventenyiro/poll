const handle400Error = (err, req, res, next) => {
    if (err.statusCode === 400) {
        res.status(400).json({ message: err.message });
    } else {
        next(err);
    }
};

const handle500Error = (err, req, res, next) => {
    if (err.statusCode === 500) {
        res.status(500).json({ message: 'Server Error' });
    } else {
        next(err);
    }
};

module.exports = {
    handle400Error,
    handle500Error,
};
