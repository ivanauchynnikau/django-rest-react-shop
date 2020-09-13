import React, {Component} from 'react';
import {connect} from "react-redux";
import ProductProvider from "./../../providers/products";
import Product from "./../../components/product/product";
import uuid from 'react-uuid'


class ProductListPage extends Component {
  static defaultProps = {
    productList: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.productProvider.getProductList();
  }

  render() {
    const {
      productList
    } = this.props;

    return (
      <div className="product-list-page">
        {productList.map(product => (
          <Product
            key={uuid()}
            product={product}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    productList: state.products.productList
  }),
  dispatch => ({
    productProvider: new ProductProvider(dispatch),
    // redirectToAppsPage: () => {dispatch(push('/apps/'))},
  })
)(ProductListPage);
