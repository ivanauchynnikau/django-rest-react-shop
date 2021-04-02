import {
  UPDATE_CART,
} from "../actions/local-cart";


const initialState = {
  orderList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      const newState = Object.assign({}, {orderList: action.data,});
      return newState;

    default:
      return state;
  }
}
