import React, {Component} from 'react';
import {connect} from "react-redux";
import ProductProvider from "./../../providers/products";
import Product from "./../../components/product/product";
import uuid from 'react-uuid'
import Select from 'react-select';


class ProductListPage extends Component {
  static defaultProps = {
    productList: [],
    selectedSorting: 'default',
    sortingOptions: [
      { value: 'default', label: 'Default sorting' },
      { value: 'lowPrice', label: 'Low price' },
      { value: 'highPrice', label: 'High price' },
    ],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.productProvider.getProductList();
  }

  onSortingChange = selectedOption => {
    this.setState({ selectedOption });

    switch(selectedOption) {
      case 'lowPrice':

        break;

      case 'highPrice':

        break;

      default:

        break;
    }
  };

  render() {
    const {
      productList,
      sortingOptions,
      selectedOption
    } = this.props;

    return (
      <div className="product-list-page">
        <div className="product-list-page__top">
          <div className="product-list-page__top-sorting">
            <Select
              value={selectedOption}
              onChange={this.onSortingChange}
              options={sortingOptions}
            />
          </div>
        </div>
        <div className="product-list-page__content">
          {productList.map(product => (
            <Product
              key={uuid()}
              product={product}
            />
          ))}
        </div>
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
  })
)(ProductListPage);
