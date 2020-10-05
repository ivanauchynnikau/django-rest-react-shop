const assert = require('chai').assert;
var conf = require('../tests-config');

var openSignInModalBtn = '[data-locator="open-sign-up-modal-btn"]'; // +
var signInModal = '[data-locator="sign-in-modal"]';
var signUpTabBtn = '[data-locator="sign-up-tab"]';
var signUpEmailInput = '[data-locator="sign-up-email-input"]';
var signUpPasswordInput = '[data-locator="sign-up-password-input"]';
var signUpPasswordRepeatInput = '[data-locator="sign-up-password-repeat-input"]';
var signUpSubmitBtn = '[data-locator="sign-up-submit-btn"]';
var loading = '[data-locator="loading"]';
var topBarUserBlock = '[data-locator="top-bar-user-block"]';


describe('Website >', () => {
  describe('Home page >', () => {
    it('Should register user', function () {
      return this.browser
        .url('/')
        .waitForVisible(openSignInModalBtn, conf.delays.visible)
        .click(openSignInModalBtn)
        .waitForVisible(signInModal, conf.delays.visible)
        .click(signUpTabBtn)
        .waitForVisible(signUpEmailInput, conf.delays.visible)
        .setValue(signUpEmailInput, conf.users.email)
        .setValue(signUpPasswordInput, conf.users.password)
        .setValue(signUpPasswordRepeatInput, conf.users.password)
        .click(signUpSubmitBtn)
        .waitForVisible(loading, conf.delays.visible)
        .then(() => {assert.ok(this.browser.waitForVisible(topBarUserBlock, conf.delays.visible))})
        .waitForVisible(signUpEmailInput, 10000000)
    });
  });
});
