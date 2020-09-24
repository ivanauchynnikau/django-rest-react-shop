import React, {Component} from 'react';
import SignIn from './../sign-in/sign-in';
import Modal from './../modal/modal';
import TopBarCart from './../top-bar-cart/top-bar-cart';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import LocalCart from "../../providers/local-cart";
import UserProvider from "../../providers/user";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";

export class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignInModalSeen: false,
      user: {}
    };

    this.openSignInModal = this.openSignInModal.bind(this);
    this.closeSignInModal = this.closeSignInModal.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user,
      };
    }

    return null;
  }

  static defaultProps = {
    user: {},
  };

  openSignInModal() {
    this.setState({isSignInModalSeen: true});
  }

  closeSignInModal() {
    this.setState({isSignInModalSeen: false});
  }

  logOut = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    this.props.userProvider.logOut(token);
  }

  render() {
    const {
      isSignInModalSeen,
      user
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
              {
                user.isAuthenticated ?
                <div className="top-bar__user">
                  <div className="top-bar__user-email">
                    {user.email}
                  </div>
                  <button
                    className="button top-bar__button"
                    onClick={this.logOut}
                  >
                    Log out
                  </button>
                </div>
                  :
                <button
                  className="button top-bar__button"
                  onClick={this.openSignInModal}
                >
                  Sign in
                </button>
              }
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

export default connect(
  state => ({
    user: state.user.user
  }),
  dispatch => ({
    localCartProvider: new LocalCart(dispatch),
    userProvider: new UserProvider(dispatch),
  })
)(TopBar);
