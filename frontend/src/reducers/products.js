import {
  GET_PRODUCT_LIST,
} from "../actions/products";


const initialState = {
  productList: [],
  productListLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      const newState = Object.assign({}, {
        productList: action.data,
        productListLoaded: true,
      });
      return newState;

    default:
      return state;
  }
}
