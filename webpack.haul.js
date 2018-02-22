const path = require('path');

module.exports = ({ platform, root }, defaults) => ({
  entry: `./index.js`,
  resolve: {
    ...defaults.resolve,
    alias: {
      ...defaults.resolve.alias,
    }
  }
});