// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
