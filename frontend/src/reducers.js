
import products from './reducers/products'
import localCart from './reducers/local-cart'
import user from './reducers/user'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  products: products,
  localCart: localCart,
  user: user,
});
export default createRootReducer
