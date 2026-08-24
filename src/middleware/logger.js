const logger = (req, res, next) => {
    const time = new Date().toLocaleDateString();

    console.log(`[${time}] ${req.method} ${req.originalUrl}`);

    next();
};

module.exports = logger;