import React, {Component} from 'react';
import {connect} from "react-redux";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";
import UserProvider from "../../providers/user";
import LocalCart from "../../providers/local-cart";


class InitializingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.props.localCartProvider.getProductsInCart();

    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      this.props.userProvider.getUser(token);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  state => ({
    user: state.user.user
  }),
  dispatch => ({
    userProvider: new UserProvider(dispatch),
    localCartProvider: new LocalCart(dispatch),
  })
)(InitializingContainer);
