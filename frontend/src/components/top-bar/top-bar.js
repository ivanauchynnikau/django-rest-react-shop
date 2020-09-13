import React, {Component} from 'react';
import {connect} from "react-redux";
import LogIn from './../login/login';
import SignUp from './../sign-up/sign-up';
import Modal from './../modal/modal';
import TopBarCart from './../top-bar-cart/top-bar-cart';
import {
  Link,
} from "react-router-dom";

// TODO add props description!

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalSeen: false,
      isSignUpModalSeen: false
    };

    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
  }

  openLoginModal() {
    this.setState({isLoginModalSeen: true});
  }

  closeLoginModal() {
    this.setState({isLoginModalSeen: false});
  }

  openSignUpModal() {
    this.setState({isSignUpModalSeen: true});
  }

  closeSignUpModal() {
    this.setState({isSignUpModalSeen: false});
  }

  render() {
    const {
      isLoginModalSeen,
      isSignUpModalSeen
    } = this.state;

    return (
      <div className="top-bar">
        <div className="container">
          <div className="top-bar__wrapper">
          <div className="top-bar__left">
            <Link className="top-bar__logo" to="/">
              SHOP
            </Link>
          </div>
          <div className="top-bar__right">
            <button
              className="button top-bar__button"
              onClick={this.openLoginModal}
            >
              Login
            </button>

            <button
              className="button top-bar__button"
              onClick={this.openSignUpModal}
            >
              Sign up
            </button>
            <TopBarCart/>
          </div>
        </div>
        </div>
        <Modal
          isOpen={isLoginModalSeen}
          closeModal={this.closeLoginModal}
        >
          <LogIn
            closeModal={this.closeLoginModal}
          />
        </Modal>
        <Modal
          isOpen={isSignUpModalSeen}
          closeModal={this.closeSignUpModal}
        >
          <SignUp
            closeModal={this.closeSignUpModal}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(
  null
)(Main);
