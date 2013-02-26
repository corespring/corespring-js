if (process.env.TEST_COV_CLEVERJS) {
  module.exports = require('./lib-js-cov/corespring');
} else {
  module.exports = require('./lib/corespring');
}
