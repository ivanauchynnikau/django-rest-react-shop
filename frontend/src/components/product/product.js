import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import LocalCart from "../../providers/local-cart";
import {Link} from "react-router-dom";
import {CURRENCY} from "../../utils/js/config";


class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    customClass: PropTypes.string,
    orderViewMode: PropTypes.bool,
  };

  static defaultProps = {
    product: {},
  };

  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(event, product) {
    if (this.props.viewMode) return;

    event.preventDefault();
    event.stopPropagation();

    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      category: product.category,
      price: product.price,
      description: product.description,
      inStock: product.in_stock
    };

    this.props.localCartProvider.addProductToCart(cartItem);
  }

  render() {
    const {
      product,
      customClass,
      orderViewMode
    } = this.props;

    return (
      <div className={`product ${customClass ? customClass : ''}`}>
        <Link key={product.id}
              className="product__link"
              to={`/products/${product.id}`}
        >
          <div className="product__title">
            {product.title}
          </div>
          <div className="product__container">
            <div className="product__top">
              <img
                className="product__img"
                src={product.image}
                alt={product.description}
                title={product.title}
              />
            </div>
            <div className="product__bottom">
              <div className="product__description">
                {product.description}
              </div>

              {!orderViewMode ?
                <div className="product__in-stock">
                  In stock: {product.in_stock}
                </div>
                : null
              }
              <div className="product__price">
                {CURRENCY}{product.price}
              </div>
              {
                !orderViewMode ?
                <button
                  disabled={!product.in_stock}
                  title={!product.in_stock ? 'Product is unavailable' : ''}
                  className="product__button button"
                  onClick={(e) => {
                    this.addToCart(e, product)
                  }}
                >
                  Add to cart
                </button> : null
              }
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    localCartProvider: new LocalCart(dispatch),
  })
)(Product);
