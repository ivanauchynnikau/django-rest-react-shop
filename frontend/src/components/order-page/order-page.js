import React, {Component} from 'react';
import {connect} from "react-redux";
import OrderProvider from "../../providers/orders";
import {push} from "react-router-redux";


class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.orderId = parseInt(props.match.params.id);
  }

  componentDidMount() {
    this.props.orderProvider.getOrder(this.orderId)
      .then((order) => {
        this.setState({order});
      })
      .catch((error) => {
        this.props.redirectToHomePage();
      });
  }

  render() {
    const {
      product
    } = this.state;

    return (
      <div className="order-page">
        <div className="order-page__img">
          123
          {product}
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
