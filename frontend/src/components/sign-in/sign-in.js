import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {handleValueChange} from "../../utils/js/utils";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from "react-redux";
import UserProvider from "../../providers/user";
import {NotificationManager} from "react-notifications";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";

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
        .then((response) => {
          const token = response.data.auth_token;

          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
          this.props.userProvider.getUser(token)
            .then(() => {
              this.props.closeModal();
            })
            .catch((error) => {
              NotificationManager.warning('Something went wrong! please contact us!');
            });
        })
        .catch((error) => {
          // TODO add ability to get error via error.error_text
          NotificationManager.error(error.response.data.error_text);
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
        .then((response) => {
          const token = response.data.auth_token;

          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
          this.props.userProvider.getUser(token);
          this.props.closeModal();
        })
        .catch((error) => {
          // TODO add ability to get error via error.error_text
          NotificationManager.error(error.response.data.error_text);
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
      <div className="sign-in">
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign up</Tab>
        </TabList>

        <TabPanel>
          <form className="sign-in__form" noValidate>
            <div className="form-item">
              <label className="form-item__label" htmlFor="loginEmail">Email</label>
              <input
                name="loginEmail"
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
