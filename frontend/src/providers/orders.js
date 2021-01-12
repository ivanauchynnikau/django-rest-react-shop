import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';
import {START_LOADING, END_LOADING} from "../actions/loading";


export default class OrderProvider extends DataProvider {
  addOrder(productIdsArray, email) {
    this.dispatch(START_LOADING);

    return axios.post('/api/v1/orders/create/', {data: {productIdsArray, email: email}})
      .then((response) =>  {
        return response.data;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong! please contact us!');
        console.error(error);
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }

  getOrder(orderId) {
    this.dispatch(START_LOADING);

    return axios.get(`/api/v1/orders/${orderId}/`)
      .then((response) =>  {
        return response.data;
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }

  getUserOrdersList({token}) {
    this.dispatch(START_LOADING);

    return axios.get(`/api/v1/orders/user/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) =>  {
        return response.data;
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }
}
