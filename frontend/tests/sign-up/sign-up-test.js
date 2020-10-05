const assert = require('chai').assert;
var {delays, users} = require('../tests-config');


var signInModal = '[data-locator="sign-in-modal"]';
var loading = '[data-locator="loading"]';
var topBarUserBlock = '[data-locator="top-bar-user-block"]';
var topBarDropdown = '[data-locator="top-bar-dropdown"]';

var signUpEmailInput = '[data-locator="sign-up-email-input"]';
var signUpPasswordInput = '[data-locator="sign-up-password-input"]';
var signUpPasswordRepeatInput = '[data-locator="sign-up-password-repeat-input"]';

var loginEmailInput = '[data-locator="login-email-input"]';
var loginPasswordInput = '[data-locator="login-password-input"]';

var signUpTabBtn = '[data-locator="sign-up-tab"]';
var signUpSubmitBtn = '[data-locator="sign-up-submit-btn"]';
var loginSubmitBtn = '[data-locator="login-submit-btn"]';
var openSignInModalBtn = '[data-locator="open-sign-up-modal-btn"]';
var topBarLogoutBtn = '[data-locator="top-bar-log-out-btn"]';
var topBarUserBtn = '[data-locator="top-bar-user-btn"]';


var email = users.email;
var password = users.password;

describe('Website >', () => {
  describe('Home >', () => {
    it('Should register user', function () {
      return this.browser
        .url('/')
        .waitForVisible(openSignInModalBtn, delays.visible)
        .click(openSignInModalBtn)
        .waitForVisible(signInModal, delays.visible)
        .click(signUpTabBtn)
        .waitForVisible(signUpEmailInput, delays.visible)
        .setValue(signUpEmailInput, email)
        .setValue(signUpPasswordInput, password)
        .setValue(signUpPasswordRepeatInput, password)
        .click(signUpSubmitBtn)
        .waitForVisible(loading, delays.visible)
        .then(() => {assert.ok(this.browser.waitForVisible(topBarUserBlock, delays.visible))})
    });

    it('Should log in and log out user', function () {
      return this.browser
        .url('/')
        .waitForVisible(openSignInModalBtn, delays.visible)
        .click(openSignInModalBtn)
        .waitForVisible(loginEmailInput, delays.visible)
        .setValue(loginEmailInput, email)
        .setValue(loginPasswordInput, password)
        .click(loginSubmitBtn)
        .waitForVisible(loading, delays.visible)
        .waitForVisible(topBarUserBtn, delays.visible)
        .click(topBarUserBtn)
        .waitForVisible(topBarDropdown, delays.visible)
        .waitForVisible(topBarLogoutBtn, delays.visible)
        .click(topBarLogoutBtn)
        .then(() => {assert.ok(this.browser.waitForVisible(openSignInModalBtn, delays.visible))})
    });
  });
});
