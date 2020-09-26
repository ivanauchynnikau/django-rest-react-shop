import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';


export default class OrderProvider extends DataProvider {
  addOrder(productIdsArray, email) {
    return axios.post('/api/v1/orders/create/', {data: {productIdsArray, email: email}})
      .then((response) =>  {
        return response.data;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong!');
        console.error(error);
      });
  }
}
