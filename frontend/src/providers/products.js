import DataProvider from '../utils/js/data-provider';
import axios from "axios";
import {GET_PRODUCT_LIST} from "../actions/products";


export default class ProductProvider extends DataProvider {
  getProductList() {
    return axios.get('/api/v1/products/', {method: 'GET'})
      .then((response) => {
        this.dispatch(GET_PRODUCT_LIST, {data: response.data});
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  getProduct(id) {
    return axios.get(`/api/v1/products/${id}/`, {method: 'GET'})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
