var {host} = require('./frontend/tests/tests-config');

module.exports = {
  baseUrl: host,
  sets: {
    desktop: {
      files: './frontend/tests/**/*.js',
      browsers: ['chrome']
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome' // this browser should be installed on your OS
      },
      windowSize: {
        width: 1200,
        height: 800
      },
    },
  }
};
