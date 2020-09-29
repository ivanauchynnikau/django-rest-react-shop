import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import uuid from 'react-uuid'
import LocalCart from "../../providers/local-cart";
import OrderProvider from "../../providers/orders";
import {CURRENCY} from '../../utils/js/config'
import {Link} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import {NotificationManager} from 'react-notifications';
import {Loader} from '../loader/loader';


class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: props.orderList,
      isLoading: false,
    }
  }

  static defaultProps = {
    orderList: [],
  };

  static getDerivedStateFromProps(props) {
    return {orderList: props.orderList};
  }

  submitOrder = () => {
    const {
      orderList
    }  = this.state;

    if (!orderList) return ;
    if (!orderList.length) return;

    const orderIdsArray = orderList.map((order) => order.id);
    const email = this.props.user.email;

    this.setState({isLoading: true});

    this.props.orderProvider.addOrder(orderIdsArray, email)
      .then((response) => {
        const orderId = response[0].id;

        this.props.localCartProvider.clearCart();
        NotificationManager.success(`Order № ${orderId} was created!`);
        this.setState({isLoading: false});

        this.props.redirectToOrderPage(orderId);
      });
  }

  deleteOrderItem = (cartItem, closeModal) => {
    if (!cartItem) return;

    this.props.localCartProvider.removeProduct(cartItem.id);
    NotificationManager.success(`"${cartItem.title}" was deleted!`);
    closeModal();
  }

  onSubmitCLick = () => {
    if (this.props.user && this.props.user.isAuthenticated) {
      this.submitOrder();
      return;
    }

    this.showInfoSignInModal();
  }

  showInfoSignInModal = (item) => {
    confirmAlert({
      customUI: () => {
        return (
          <div className='react-confirm-alert__modal _sign-in-alert'>
            <div className="react-confirm-alert__modal-text">
              Please sign in!
            </div>
          </div>
        );
      }
    });
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
      orderList,
      isLoading
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
            <div className="cart-page__bottom">
              <div className="container">
                <div className="cart-page__bottom-container">
                  <div className="cart-page__bottom-details">
                    <div className="cart-page__bottom-details-text">
                      Total price: <b>{this.getTotalPrice()}</b>
                    </div>
                    <div className="cart-page__bottom-details-text">
                      Total quantity: <b>{orderList.length}</b>
                    </div>
                  </div>
                  <button
                    className="cart-page__bottom-btn button"
                    onClick={this.onSubmitCLick}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
            : null
        }
        <Loader isSeen={isLoading}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    orderList: state.localCart.orderList,
    user: state.user.user
  }),
  dispatch => ({
    localCartProvider: new LocalCart(dispatch),
    orderProvider: new OrderProvider(dispatch),
    redirectToOrderPage: (orderId) => {dispatch(push(`/orders/${orderId}`))},
  })
)(CartPage);
