import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {handleValueChange} from "../../utils/js/utils";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      // TODO add request

      this.props.closeModal();
      return;
    }

    this.loginValidator.showMessages();
    this.forceUpdate();
  };

  signUp = (e) => {
    e.preventDefault();

    if (this.signUpValidator.allValid()) {
      // TODO add request

      this.props.closeModal();
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
              <label className="form-item__label" htmlFor="email">Email</label>
              <input
                name="email"
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
              <label className="form-item__label" htmlFor="password">Password</label>
              <input
                name="password"
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
