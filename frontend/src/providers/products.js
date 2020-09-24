import DataProvider from '../utils/js/data-provider';
import axios from "axios";
import {GET_PRODUCT_LIST} from "../actions/products";


export default class ProductProvider extends DataProvider {
  getProductList() {
    return axios.get('/api/v1/products/')
      .then((response) => {
        this.dispatch(GET_PRODUCT_LIST, {data: response.data});
        return response.data;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong!');
        return error;
      });
  }

  getProduct(id) {
    return axios.get(`/api/v1/products/${id}/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
