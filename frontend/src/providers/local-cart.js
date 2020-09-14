import axios from "axios";
import {NotificationManager} from "react-notifications";
import DataProvider from '../utils/js/data-provider';
import {UPDATE_CART} from "../actions/local-cart";
import {LOCAL_STORAGE_KEYS} from "../utils/js/config";


export default class LocalCart extends DataProvider {
  addProductToCart(product) {
    let updatedCartItemsArray = [];

    const cart = localStorage.getItem(LOCAL_STORAGE_KEYS.LOCAL_CART);
    if (cart && JSON.parse(cart).length) {
      const cartItemsArray = JSON.parse(cart);
      cartItemsArray.push(product);
      updatedCartItemsArray = cartItemsArray;

      localStorage.setItem(LOCAL_STORAGE_KEYS.LOCAL_CART, JSON.stringify(updatedCartItemsArray));

      this.dispatch(UPDATE_CART, {data: updatedCartItemsArray});
      return;
    }

    updatedCartItemsArray.push(product);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOCAL_CART, JSON.stringify(updatedCartItemsArray));

    this.dispatch(UPDATE_CART, {data: updatedCartItemsArray});
  }

  removeProduct (productId) {
    const cart = localStorage.getItem(LOCAL_STORAGE_KEYS.LOCAL_CART);

    if (cart && JSON.parse(cart).length) {
      const cartProductsArray = JSON.parse(cart);
      const itemIndex = cartProductsArray.findIndex((item) => productId === item.id);

      if (itemIndex === undefined) return;

      cartProductsArray.splice(itemIndex, 1);

      localStorage.setItem(LOCAL_STORAGE_KEYS.LOCAL_CART, JSON.stringify(cartProductsArray));

      this.dispatch(UPDATE_CART, {data: cartProductsArray});
    }
  }

  getProductsInCart () {
    const ordersListJsonString = localStorage.getItem(LOCAL_STORAGE_KEYS.LOCAL_CART);
    this.dispatch(UPDATE_CART, {data: JSON.parse(ordersListJsonString)});
  }
}
