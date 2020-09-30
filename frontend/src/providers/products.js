import DataProvider from '../utils/js/data-provider';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {GET_PRODUCT_LIST} from '../actions/products';
import {END_LOADING, START_LOADING} from "../actions/loading";


export default class ProductProvider extends DataProvider {
  getProductList() {
    this.dispatch(START_LOADING);

    return axios.get('/api/v1/products/')
      .then((response) => {
        this.dispatch(GET_PRODUCT_LIST, {data: response.data});
        return response.data;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong! please contact us!');
        return error;
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }

  getProduct(id) {
    this.dispatch(START_LOADING);

    return axios.get(`/api/v1/products/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }
}
