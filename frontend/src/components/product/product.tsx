import {Component, SyntheticEvent} from 'react';
import * as React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import LocalCart from "../../providers/local-cart";
import {Link} from "react-router-dom";
import {CURRENCY} from "../../utils/js/config";

export interface ProductShape {
  id: number,
  title: string,
  image: string,
  category: string,
  price: string,
  description: string,
  in_stock: number,
}

export interface CartItemShape {
  id: number,
  title: string,
  image: string,
  category: string,
  price: string,
  description: string,
  inStock: number,
}

export interface Props {
  product: ProductShape,
  customClass: string,
  orderViewMode: boolean,
  localCartProvider: {
    addProductToCart: (arg: CartItemShape) => void
  },
}

class Product extends Component<Props> {
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
  }

  addToCart = (event: SyntheticEvent, product: ProductShape) => {
    if (this.props.orderViewMode) return;

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

  onImgError = (e) => {
    e.target.onerror = null;
    e.target.src="data:image/png;base64,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"
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
                onError={this.onImgError}
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
