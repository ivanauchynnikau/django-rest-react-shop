import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';
import {CLEAR_USER, SET_USER} from "../actions/user";


export default class UserProvider extends DataProvider {
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
        return error;
      });
  }

  logOut(token) {
    return axios.post('/auth/token/logout/', {}, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) =>  {
        this.dispatch(CLEAR_USER);
        return response;
      })
      .catch((error) => {
        NotificationManager.warning('Something went wrong!');
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
        return error;
      });
  }

  getUser(token) {
    return axios.get('/auth/users/me/', {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) =>  {
        const data = {
          email: response.data.email,
          id: response.data.id,
          isAuthenticated: true
        };

        this.dispatch(SET_USER, {data});
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}
