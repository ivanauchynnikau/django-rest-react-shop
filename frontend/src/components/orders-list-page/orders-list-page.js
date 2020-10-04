import React, {Component} from 'react';
import {connect} from "react-redux";
import OrderProvider from "../../providers/orders";
import {push} from "react-router-redux";
import uuid from "react-uuid";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";
import Product from "../product/product";
import {Link} from "react-router-dom";


class OrdersListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      this.props.redirectToHomePage();
      return;
    }

    this.props.orderProvider.getUserOrdersList({token})
      .then((response) => {
        this.setState({orderList: response.data});
      })
      .catch(() => {
        this.props.redirectToHomePage();
      });
  }

  render() {
    const {
      orderList
    } = this.state;

    return (
      <div className="orders-list-page">
        <h2>My orders</h2>
        <div className="orders-list-page__list">
          {
            orderList && orderList.length ?
            orderList.map((order) => {
              return (
                <div className="orders-list-page__list-item" key={uuid()}>
                  <div className="orders-list-page__list-item-top">
                    <Link
                      className="orders-list-page__list-item-link"
                      to={`/orders/${order.id}`}
                    >
                      <h3>Order №: {order.id}</h3>
                    </Link>
                    <h3>Order date: {order.create_date}</h3>
                  </div>
                  <div className="orders-list-page__list-item-content">
                    {
                      order.product_items.map((product) => {
                        return (
                          <Product
                            orderViewMode={true}
                            product={product}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
            :
            <div className="cart-page__empty">
              Your order list is empty, please go to <Link to="/">catalog</Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user
  }),
  dispatch => ({
    orderProvider: new OrderProvider(dispatch),
    redirectToHomePage: () => {dispatch(push('/'))},
  })
)(OrdersListPage);
