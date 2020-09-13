import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import LocalCart from "./../../providers/local-cart";


class TopBarCart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.localCartProvider.getProductsInCart();
  }

  render() {
    const {
      orderList
    } = this.props;

    console.log(orderList);

    return (
      <Link
        className="top-bar-cart"
        to={'/cart/'}
      >
        <svg className="top-bar-cart__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path style={{fill: '#fff'}} d="M37 64.5c-3 0-5.5 2.5-5.5 5.5s2.4 5.5 5.5 5.5 5.5-2.5 5.5-5.5S40 64.5 37 64.5zM20.5 20.5V26H26l9.9 20.9 -3.7 6.7c-0.4 0.8-0.7 1.7-0.7 2.6 0 3 2.5 5.5 5.5 5.5h33v-5.5H38.2c-0.4 0-0.7-0.3-0.7-0.7l0.1-0.3 2.5-4.5h20.5c2.1 0 3.9-1.1 4.8-2.8l9.8-17.8c0.2-0.4 0.3-0.9 0.3-1.3 0-1.5-1.2-2.8-2.8-2.8H32.1l-2.6-5.5H20.5zM64.5 64.5c-3 0-5.5 2.5-5.5 5.5s2.4 5.5 5.5 5.5c3 0 5.5-2.5 5.5-5.5S67.5 64.5 64.5 64.5z"/></svg>
        {
          orderList ?
          <div className="top-bar-cart__quantity">{orderList.length}</div>
          : null
        }
      </Link>
    );
  }
}

export default connect(
  state => ({
    orderList: state.localCart.orderList
  }),
  dispatch => ({
    localCartProvider: new LocalCart(dispatch),
  })
)(TopBarCart);
