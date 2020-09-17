import React, {Component} from 'react';
import SignIn from './../sign-in/sign-in';
import Modal from './../modal/modal';
import TopBarCart from './../top-bar-cart/top-bar-cart';
import {Link} from "react-router-dom";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignInModalSeen: false
    };

    this.openSignInModal = this.openSignInModal.bind(this);
    this.closeSignInModal = this.closeSignInModal.bind(this);
  }

  openSignInModal() {
    this.setState({isSignInModalSeen: true});
  }

  closeSignInModal() {
    this.setState({isSignInModalSeen: false});
  }

  render() {
    const {
      isSignInModalSeen
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
              onClick={this.openSignInModal}
            >
              Sign in
            </button>
            <TopBarCart/>
          </div>
        </div>
        </div>
        <Modal
          isOpen={isSignInModalSeen}
          closeModal={this.closeSignInModal}
        >
          <SignIn
            closeModal={this.closeSignInModal}
          />
        </Modal>
      </div>
    )
  }
}
