var {host} = require('./frontend/hermione/tests/tests-config');

const browserScreenWidth = 1366;
const browserScreenHeight = 768;

module.exports = {
  baseUrl: host,
  gridUrl: 'http://localhost:4444/wd/hub',
  compositeImage: true,
  sets: {
    desktop: {
      files: './frontend/hermione/tests/**/*.js',
      browsers: ['chrome', 'firefox', 'opera']
    }
  },
  browsers: {
    chrome: {
      screenshotsDir: (test) => `frontend/hermione/screenshots/chrome/${browserScreenWidth}x${browserScreenHeight}/${test.parent.title}`,
      desiredCapabilities: {
        browserName: 'chrome', // this browser should be installed on your OS
        chromeOptions: {
          args: ['--headless'],
        },
      },
      windowSize: {
        width: browserScreenWidth,
        height: browserScreenHeight
      },
    },
    firefox: {
      screenshotsDir: (test) => `frontend/hermione/screenshots/firefox/${browserScreenWidth}x${browserScreenHeight}/${test.parent.title}`,
      desiredCapabilities: {
        browserName: 'firefox', // this browser should be installed on your OS
        chromeOptions: {
          args: ['--headless'],
        },
      },
      windowSize: {
        width: browserScreenWidth,
        height: browserScreenHeight
      },
    },
    opera: {
      screenshotsDir: (test) => `frontend/hermione/screenshots/opera/${browserScreenWidth}x${browserScreenHeight}/${test.parent.title}`,
      desiredCapabilities: {
        browserName: 'opera', // this browser should be installed on your OS
        chromeOptions: {
          args: ['--headless'],
        },
      },
      windowSize: {
        width: browserScreenWidth,
        height: browserScreenHeight
      },
    },
  },
  plugins: {
    'html-reporter/hermione': {
      enabled: true,
      path: 'frontend/hermione/reports',
      defaultView: 'all',
      baseHost: host
    }
  }
};
