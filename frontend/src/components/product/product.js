import React, {Component} from 'react';
import {connect} from "react-redux";
import ProductProvider from "./../../providers/products";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

class Product extends Component {
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
      .catch((error) => {
        console.log('get product error', error);
      });
  }

  render() {
    const {
      product
    } = this.state;

    return (
      <div className="product">
        <div className="product__title">
          {product.title}
        </div>
        <div className="product__main">
          <div className="product__left">
          <img
            className="product__img"
            src={product.image}
            alt={product.description}
            title={product.title}
          />
          <button
            className="product__button button"
            // onClick={() => {
            //   this.addToCart(product.id)
            // }}
            color="primary">
            Buy
          </button>
        </div>
        <div className="product__right">
          <div className="product__description">
            Description: {product.description}
          </div>
          <div className="product__category">
            Catgory: {product.category}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    productProvider: new ProductProvider(dispatch),
  })
)(Product);
