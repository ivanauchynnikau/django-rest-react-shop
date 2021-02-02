import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from "react-uuid";

import Product from "../product/product";
import ProductProvider from "../../providers/products";


class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productId: props.match.params.id
    };
  }

  componentDidMount() {
    this.props.productProvider.getProduct(this.state.productId)
      .then((product) => {
        this.setState({product})
      })
  }

  render() {
    const {
      product
    } = this.state;

    return (
      <div className="product-page">
        <Product
          customClass="_product-page"
          key={uuid()}
          product={product}
        />
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    productProvider: new ProductProvider(dispatch),
  })
)(ProductPage);
