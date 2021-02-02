import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from "react-uuid";
import {push} from "react-router-redux";
import {NotificationManager} from "react-notifications";

import OrderProvider from "../../providers/orders";
import {getOrderStateName} from "../../utils/js/utils";
import Product from "../product/product";


class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        comment: null,
        state: null,
        items: []
      }
    };

    this.orderId = parseInt(props.match.params.id);
  }

  componentDidMount() {
    this.props.orderProvider.getOrder(this.orderId)
      .then((order) => {
        this.setState({order});
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong! please contact us!');
        this.props.redirectToHomePage();
      });
  }

  totalPriceRenderer = () => {
    return this.state.order.items.reduce((sum, item) => sum + (parseFloat(item.item.price)), 0).toFixed(2);
  }

  render() {
    const {
      order
    } = this.state;

    return (
      <div className="order-page">
        <div className="order-page__status">
          Order status: {getOrderStateName(order.state)}
        </div>
        <div className="order-page__total">
          Total order price: {this.totalPriceRenderer()}
        </div>
        <div className="order-page__product-title">
          Products:
        </div>
        <div className="order-page__product-list">
          {order.items.map(item => (
            <div className="order-page__product-item"
                 key={uuid()}
            >
              <Product
                orderViewMode={true}
                product={item.item}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    orderProvider: new OrderProvider(dispatch),
    redirectToHomePage: () => {dispatch(push('/'))},
  })
)(OrderPage);
