import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";

import UserProvider from "../../providers/user";
import {
  handleValueChange,
  getError
} from "../../utils/js/utils";


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: '',
      loginPassword: '',
      email: '',
      password: '',
      passwordRepeat: '',
    };

    this.loginValidator = new SimpleReactValidator({
      messages: {
        loginEmail: 'Please enter a valid email',
        loginPassword: 'Please enter a password'
      },
    });

    this.signUpValidator = new SimpleReactValidator({
      messages: {
        email: 'Please enter a valid email',
        password: 'Please enter a password',
        passwordRepeat: 'Please enter a password',
        in: 'Passwords need to match'
      },
    });
  }

  login = (e) => {
    e.preventDefault();

    if (this.loginValidator.allValid()) {
      const payload = {
        email: this.state.loginEmail,
        password: this.state.loginPassword
      };

      this.props.userProvider.login(payload)
        .then(() => {
          this.props.closeModal();
        })
        .catch((error) => {
          NotificationManager.error(getError(error));
        })
      return;
    }

    this.loginValidator.showMessages();
    this.forceUpdate();
  };

  signUp = (e) => {
    e.preventDefault();

    if (this.signUpValidator.allValid()) {
      const payload = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.userProvider.signUp(payload)
        .then(() => {
          this.props.closeModal();
        })
        .catch((error) => {
          NotificationManager.error(getError(error));
        });

      return;
    }

    this.signUpValidator.showMessages();
    this.forceUpdate();
  };

  render() {
    const {
      email,
      loginEmail,
      password,
      loginPassword,
      passwordRepeat
    } = this.state;

    return (
      <div
        className="sign-in"
        data-locator="sign-in-modal"
      >
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab data-locator="sign-up-tab">Sign up</Tab>
        </TabList>

        <TabPanel>
          <form className="sign-in__form" noValidate>
            <div className="form-item">
              <label className="form-item__label" htmlFor="loginEmail">Email</label>
              <input
                name="loginEmail"
                data-locator="login-email-input"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={loginEmail}
                className="form-item__input"
                type="text"
              />
              {this.loginValidator.message('email', loginEmail, 'required|email')}
            </div>
            <div className="form-item">
              <label className="form-item__label" htmlFor="loginPassword">Password</label>
              <input
                data-locator="login-password-input"
                name="loginPassword"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={loginPassword}
                className="form-item__input"
                type="password"
              />
              {this.loginValidator.message('password', loginPassword, 'required|min:6')}
            </div>
            <button
              data-locator="login-submit-btn"
              className="button sign-in__button"
              onClick={this.login}
            >
              Login
            </button>
          </form>
        </TabPanel>
        <TabPanel>
          <form className="sign-up__form" noValidate>
            <div className="form-item">
              <label className="form-item__label" htmlFor="email">Email</label>
              <input
                data-locator="sign-up-email-input"
                name="email"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={email}
                className="form-item__input"
                type="text"
              />
              {this.signUpValidator.message('email', email, 'required|email')}
            </div>
            <div className="form-item">
              <label className="form-item__label" htmlFor="password">Password</label>
              <input
                data-locator="sign-up-password-input"
                name="password"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={password}
                className="form-item__input"
                type="password"
              />
              {this.signUpValidator.message('password', password, 'required|min:6')}
            </div>
            <div className="form-item">
              <label className="form-item__label" htmlFor="passwordRepeat">Password repeat</label>
              <input
                data-locator="sign-up-password-repeat-input"
                name="passwordRepeat"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={passwordRepeat}
                className="form-item__input"
                type="password"
              />
              {this.signUpValidator.message('passwordRepeat', this.state.passwordRepeat, `required|min:6|in:${this.state.password}`, {messages: {in: 'Passwords need to match!'}})}
            </div>
            <button
              data-locator="sign-up-submit-btn"
              className="button sign-in__button"
              onClick={this.signUp}
            >
              Sign up
            </button>
          </form>
        </TabPanel>
      </Tabs>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    userProvider: new UserProvider(dispatch),
  })
)(SignIn);
