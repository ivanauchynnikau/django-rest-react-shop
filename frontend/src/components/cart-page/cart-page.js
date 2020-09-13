import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from 'react-uuid'
import {CURRENCY} from '../../utils/js/config'
import {Link} from "react-router-dom";


class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: props.orderList
    }

    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.deleteOrderItem = this.deleteOrderItem.bind(this);
  }

  static defaultProps = {
    orderList: [],
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({orderList: nextProps.orderList});
  }

  submitOrder () {
    console.log(123);
  }

  deleteOrderItem (id) {
    console.log(id);
  }

  getTotalPrice () {
    const {
      orderList
    } = this.state;

    if (!orderList) return 0;
    if (!orderList.length) return 0;

    const totalPrice = orderList.reduce((sum, item) => sum + (parseFloat(item.price)), 0);
    return `${CURRENCY}${totalPrice}`;
  }

  render() {
    const {
      orderList
    } = this.state;

    return (
      <div className="cart-page">
        {
          orderList ? orderList.map((item) => {
            return (
              <div
                className="cart-page__item"
                key={uuid()}
              >
                <div className="cart-page__item-title">
                  {item.title}
                </div>
                <div className="cart-page__item-container">
                  <div className="cart-page__item-left">
                    <img
                      className="cart-page__item-img"
                      src={item.image}
                      alt={item.description}
                      title={item.title}
                    />
                  </div>
                  <div className="cart-page__item-center">
                    <div className="cart-page__item-description">
                      Description:<br />{item.description}
                    </div>
                    <div className="cart-page__item-price">
                      Price:<br />{CURRENCY}{item.price}
                    </div>
                  </div>
                  <div className="cart-page__item-right">
                    <button
                      onClick={() => {this.deleteOrderItem(item.id)}}
                      className="button _delete">
                      Delete
                    </button>
                  </div>
                </div>
                <hr/>
              </div>
            )
          })
        :
          <div className="cart-page__empty">
            Your cart is empty, please go to <Link to="/">catalog</Link>
          </div>
        }
        {
          orderList && orderList.length ?
            <div className="cart-page__submit">
              <div className="container">
                <div className="cart-page__submit-container">
                  <div className="cart-page__submit-details">
                    <div>Total price: {this.getTotalPrice()}</div>
                    <div>Total quantity: {orderList.length}</div>
                  </div>
                  <button
                    className="cart-page__submit-btn button"
                    onClick={(e) => {
                      this.submitOrder()
                    }}
                  >
                    Submit order
                  </button>
                </div>
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    orderList: state.localCart.orderList
  }),
  dispatch => ({})
)(CartPage);
