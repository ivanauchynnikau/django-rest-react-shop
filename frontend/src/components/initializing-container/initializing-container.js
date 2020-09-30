import React, {Component} from 'react';
import {connect} from "react-redux";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";
import UserProvider from "../../providers/user";
import LocalCart from "../../providers/local-cart";
import Loader from "../loader/loader";


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
    return <Loader isLoading={this.props.isLoading}/>
  }
}

export default connect(
  state => ({
    user: state.user.user,
    isLoading: state.loading
  }),
  dispatch => ({
    userProvider: new UserProvider(dispatch),
    localCartProvider: new LocalCart(dispatch),
  })
)(InitializingContainer);
