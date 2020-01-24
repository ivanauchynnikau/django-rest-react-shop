
import products from './reducers/products'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  products: products,
});
export default createRootReducer
