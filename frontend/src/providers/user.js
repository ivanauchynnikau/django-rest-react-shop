import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';


export default class OrderProvider extends DataProvider {
  login({email, password}) {
    return axios.post('/auth/token/login/', {
      email: email,
      password: password
    })
      .then((response) =>  {
        return response;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong!');
        console.error(error);
        return error;
      });
  }

  signUp({email, password}) {
    return axios.post('/auth/users/', {
      email: email,
      password: password
    })
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
