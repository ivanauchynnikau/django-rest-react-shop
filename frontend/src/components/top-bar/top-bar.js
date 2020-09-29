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
                  <button className="top-bar__user-btn" title={user.email}>
                    <svg className="top-bar__user-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M30.7279 5.27206C27.3282 1.87234 22.8079 0 18 0C13.1918 0 8.67178 1.87234 5.27206 5.27206C1.87234 8.67178 0 13.1918 0 18C0 22.8079 1.87234 27.3282 5.27206 30.7279C8.67178 34.1277 13.1918 36 18 36C22.8079 36 27.3282 34.1277 30.7279 30.7279C34.1277 27.3282 36 22.8079 36 18C36 13.1918 34.1277 8.67178 30.7279 5.27206V5.27206ZM9.0239 31.1053C9.77673 26.7707 13.533 23.5734 18 23.5734C22.4673 23.5734 26.2233 26.7707 26.9761 31.1053C24.4204 32.8612 21.3283 33.8906 18 33.8906C14.6717 33.8906 11.5796 32.8612 9.0239 31.1053ZM12.2767 15.7407C12.2767 12.5846 14.8442 10.0173 18 10.0173C21.1558 10.0173 23.7233 12.5848 23.7233 15.7407C23.7233 18.8965 21.1558 21.464 18 21.464C14.8442 21.464 12.2767 18.8965 12.2767 15.7407V15.7407ZM28.8031 29.6422C28.2354 27.6243 27.1079 25.7934 25.5276 24.3633C24.558 23.4857 23.4544 22.7933 22.2679 22.3053C24.4124 20.9064 25.833 18.4864 25.833 15.7407C25.833 11.4217 22.319 7.90796 18 7.90796C13.681 7.90796 10.1673 11.4217 10.1673 15.7407C10.1673 18.4864 11.5878 20.9064 13.7321 22.3053C12.5458 22.7933 11.442 23.4855 10.4724 24.363C8.89233 25.7932 7.76459 27.624 7.19687 29.6419C4.06989 26.738 2.10938 22.5939 2.10938 18C2.10938 9.23785 9.23785 2.10938 18 2.10938C26.7621 2.10938 33.8906 9.23785 33.8906 18C33.8906 22.5942 31.9301 26.7383 28.8031 29.6422V29.6422Z" fill="white"/></g><defs><clipPath id="clip0"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>
                  </button>
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
