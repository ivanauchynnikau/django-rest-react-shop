import React, {Component} from 'react';
import {connect} from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import {handleValueChange} from "./../../utils/js/utils";

class LogInModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.validator = new SimpleReactValidator({
      messages: {
        email: 'Please enter a valid email',
        password: 'Please enter a password'
      },
    });

    this.submitForm = this.submitForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.closeLoginModal();
  }

  submitForm(e) {
    e.preventDefault();

    if (this.validator.allValid()) {
      console.log('valid');
    } else {
      this.validator.showMessages();
      console.log('invalid');
      this.forceUpdate();
    }
  }

  render() {
    const {
      email,
      password
    } = this.state;

    return (
      <div className="login-modal">
        <div className="login-modal__wrapper">
          <button
            className="close-button"
            onClick={this.closeModal}
          >&#10005;</button>
          <div className="login-modal__top">
            Log in
          </div>
          <form className="login-modal__form" noValidate>
            <div className="form-item">
              <input
                name="email"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={email}
                className="input"
                type="text"
              />
              {this.validator.message('email', email, 'required|email')}
            </div>
            <div className="form-item">
              <input
                name="password"
                onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                }}
                value={password}
                className="input"
                type="password"
              />
              {this.validator.message('password', password, 'required|min:6')}
            </div>
            <button
              className="button login-modal__button"
              onClick={this.submitForm}
            >Login
            </button>
          </form>
          {/* TODO add forgot password link*/}
        </div>
      </div>
    )
  }
}

export default connect(
  null
)(LogInModal);
