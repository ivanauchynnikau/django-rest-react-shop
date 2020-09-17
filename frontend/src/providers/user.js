import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';


export default class OrderProvider extends DataProvider {
  login({username, password}) {
    return axios.post('/api/v1/auth/login/', {username, password})
      .then((response) =>  {
        return response;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong!');
        console.error(error);
        return error;
      });
  }
}
