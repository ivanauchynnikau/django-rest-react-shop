import React, {Component} from 'react';
import {connect} from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import {handleValueChange} from "../../utils/js/utils";

class SignUp extends Component {
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
  }

  closeModal() {
    this.props.closeLoginModal();
  }

  submitForm(e) {
    e.preventDefault();

    if (this.validator.allValid()) {
      console.log('valid');
      this.props.closeModal()
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
      <div className="sign-up">
        <div className="sign-up__top">
          Sign up
        </div>
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
            {this.validator.message('email', email, 'required|email')}
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
            {this.validator.message('password', password, 'required|min:6')}
          </div>
          {/* TODO* add password repeat */}
          <button
            className="button sign-up__button"
            onClick={this.submitForm}
          >
            Sign up
          </button>
        </form>
        {/* TODO add forgot password link*/}
      </div>
    )
  }
}

export default connect(
  null
)(SignUp);
