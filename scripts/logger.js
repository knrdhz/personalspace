const logger = (req, res, next) => {
    console.log(`${new Date()} - Method ${req.method} - Path: ${req.originalUrl}`);
    next();
};

module.exports = logger;
