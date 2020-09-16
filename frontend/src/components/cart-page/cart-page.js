import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from 'react-uuid'
import LocalCart from "../../providers/local-cart";
import OrderProvider from "../../providers/orders";
import {CURRENCY} from '../../utils/js/config'
import {Link} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import {NotificationManager} from 'react-notifications';
import {IS_AUTHENTICATED} from '../../context';


class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: props.orderList
    }
  }

  static defaultProps = {
    orderList: [],
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({orderList: nextProps.orderList});
  }

  submitOrder = () => {
    const {
      orderList
    }  = this.state;

    if (!orderList) return ;
    if (!orderList.length) return;

    const orderIdsArray = orderList.map((order) => order.id);

    this.props.orderProvider.addOrder(orderIdsArray)
      .then((response) => {
        console.log(response);
        NotificationManager.success('Order № ... was created!');
      });
  }

  deleteOrderItem = (cartItem, closeModal) => {
    if (!cartItem) return;

    this.props.localCartProvider.removeProduct(cartItem.id);
    NotificationManager.success(`"${cartItem.title}" was deleted!`);
    closeModal();
  }

  onSubmitCLick = () => {
    if (IS_AUTHENTICATED) {
      this.submitOrder();
      return;
    }

    // TODO
    console.log('need authorize');
    // this.showLoginSignUpBlock();
  }

  showConfirmDeleteOrderItemModal = (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='react-confirm-alert__modal'>
            <div className="react-confirm-alert__modal-text">{`Are you sure you want to delete "${item.title}"?`}</div>
            <div className="react-confirm-alert__modal-buttons">
              <button
                onClick={() => {this.deleteOrderItem(item, onClose)}}
                className="react-confirm-alert__modal-button button _ghost"
              >
                Yes
              </button>
              <button
                className="react-confirm-alert__modal-button button"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        );
      }
    });
  }

  getTotalPrice () {
    const {
      orderList
    } = this.state;

    if (!orderList) return 0;
    if (!orderList.length) return 0;

    const totalPrice = orderList.reduce((sum, item) => sum + (parseFloat(item.price)), 0).toFixed(2);
    return `${CURRENCY}${totalPrice}`;
  }

  render() {
    const {
      orderList
    } = this.state;

    return (
      <div className="cart-page">
        {
          orderList && orderList.length ? orderList.map((item) => {
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
                    <Link
                      to={`/products/${item.id}`}
                      className="cart-page__item-link"
                    >
                      <img
                        className="cart-page__item-img"
                        src={item.image}
                        alt={item.description}
                        title={item.title}
                      />
                    </Link>
                  </div>
                  <div className="cart-page__item-center">
                    <div className="cart-page__item-description">
                      <b>Description:</b><br />{item.description}
                    </div>
                    <div className="cart-page__item-price">
                      <b>Price:</b><br />{CURRENCY}{item.price}
                    </div>
                  </div>
                  <div className="cart-page__item-right">
                    <button
                      onClick={() => {this.showConfirmDeleteOrderItemModal(item)}}
                      className="button _danger">
                      Delete
                    </button>
                  </div>
                </div>
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
                    <div className="cart-page__submit-details-text">
                      Total price: <b>{this.getTotalPrice()}</b>
                    </div>
                    <div className="cart-page__submit-details-text">
                      Total quantity: <b>{orderList.length}</b>
                    </div>
                  </div>
                  <button
                    className="cart-page__submit-btn button"
                    onClick={this.onSubmitCLick}
                  >
                    Buy
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
  dispatch => ({
    localCartProvider: new LocalCart(dispatch),
    orderProvider: new OrderProvider(dispatch),
  })
)(CartPage);
