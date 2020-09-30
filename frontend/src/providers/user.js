import axios from "axios";
import DataProvider from '../utils/js/data-provider';
import {CLEAR_USER, SET_USER} from "../actions/user";
import {START_LOADING, END_LOADING} from "../actions/loading";
import {LOCAL_STORAGE_KEYS} from "../utils/js/config";


export default class UserProvider extends DataProvider {
  login({email, password}) {
    this.dispatch(START_LOADING);

    return axios.post('/api/v1/accounts/login/', {email, password})
      .then((response) =>  {
        return response;
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }

  signUp({email, password}) {
    this.dispatch(START_LOADING);

    return axios.post('/api/v1/accounts/sign-up/', {email, password})
      .then((response) =>  {
        return response;
      })
      .finally(() => {
        this.dispatch(END_LOADING);
      })
  }

  getUser(token) {
    this.dispatch(START_LOADING);

    return axios.get('/api/v1/accounts/me/', {
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
      .finally(() => {
        this.dispatch(END_LOADING);
      });
  }

  logOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    this.dispatch(CLEAR_USER);
  }
}
