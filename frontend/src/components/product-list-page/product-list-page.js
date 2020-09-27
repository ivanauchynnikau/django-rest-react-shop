import React, {Component} from 'react';
import {connect} from "react-redux";
import ProductProvider from "./../../providers/products";
import Product from "./../../components/product/product";
import uuid from 'react-uuid'
import Select from 'react-select';


class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: props.productList,
      selectedOption: null,
      sortingOptions: [
        { value: 'lowPrice', label: 'Low price' },
        { value: 'highPrice', label: 'High price' },
      ],
    }
  }

  static defaultProps = {
    productList: [],
  };

  static getDerivedStateFromProps(props) {
    return {
      productList: props.productList,
    };
  }

  componentDidMount() {
    this.props.productProvider.getProductList();
  }

  onSortingChange = selectedOption => {
    this.setState({ selectedOption });

    const {
      productList
    } = this.state;

    switch(selectedOption.value) {
      case 'lowPrice':
        productList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;

      case 'highPrice':
        productList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
    }

    this.setState({productList});
  };

  render() {
    const {
      sortingOptions,
      selectedOption,
      productList
    } = this.state;

    return (
      <div className="product-list-page">
        <div className="product-list-page__top">
          <div className="product-list-page__top-sorting">
            <Select
              value={selectedOption}
              onChange={this.onSortingChange}
              options={sortingOptions}
              isSearchable={false}
              placeholder="Change sorting"
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
