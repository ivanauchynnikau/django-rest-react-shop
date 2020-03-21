import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import ProductProvider from "./../../providers/products";
import {Link} from "react-router-dom";
import { store } from 'react-notifications-component';

class Main extends Component {
  static defaultProps = {
    productList: [],
  };

  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.productProvider.getProductList()
      .then((response) => {
        console.log('get product list', response);
      })
      .catch((error) => {
        console.log('get product list error', error);
      });
  }

  addToCart(event, productId) {
    event.preventDefault();
    event.stopPropagation();

    axios.post('api/v1/orders/create/', {
      data: {
        productId: productId,
      }
    })
      .then(function (response) {
        console.log(response);

        store.addNotification({
          title: "Wonderful!",
          message: "teodosii@react-notifications-component",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const {
      productList
    } = this.props;

    return (
      <div className="product-list">
        <Box p={4}>
          <Grid container alignItems="stretch" justify="flex-start" spacing={10}>
            {productList.map(product => (
              <Grid key={product.id} item sm={12} md={6} lg={3}>
                <Link className="product-list__item-link" to={`/products/${product.id}`}>
                  <div className="product-list__item">
                    <img
                      className="product-list__img"
                      src={product.image}
                      alt={product.description}
                      title={product.title}
                    />
                    <div className="product-list__title">
                      {product.title}
                    </div>
                    <div className="product-list__description">
                      {product.description}
                    </div>
                    <button
                      className="product-list__button button"
                      onClick={(e) => {
                        this.addToCart(e, product.id)
                      }}
                      color="primary">
                      Buy
                    </button>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
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
)(Main);
