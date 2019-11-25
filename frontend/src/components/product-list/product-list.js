import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: []
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    // TODO move to provider
    axios.get('api/v1/products/all', {method: 'GET'})
      .then((response) => {
        this.setState({productList: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(productId) {
    axios.get('api/v1/order/add-to-card/',
      {
        method: 'POST',
        data: {
          productId: productId,
        }
      },
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      productList
    } = this.state;

    return (
      <div className="product-list">
        <Box p={4}>
          <Grid container alignItems="stretch" justify="flex-start" spacing={2}>
            {productList.map(product => (
              <Grid key={product.id} item sm={12} md={6} lg={3}>
                {/* TODO add link to product page*/}
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
                    onClick={(product) => {
                      this.addToCart(product.id)
                    }}
                    color="primary">
                    Buy
                  </button>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }
}

export default connect(
  null
)(Main);
