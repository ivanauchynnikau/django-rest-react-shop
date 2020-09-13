import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';


export default class ProductProvider extends DataProvider {
  addToCart(productId) {
    return axios.post('api/v1/orders/create/', {data: {productId}})
      .then((response) =>  {
        return response.data;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong!');
        console.error(error);
      });
  }
}
