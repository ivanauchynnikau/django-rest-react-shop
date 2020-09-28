import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router' // react-router v4/v5
import {NotificationContainer} from 'react-notifications';
import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from './configureStore'

const store = configureStore(/* provide initial state if any */);

// Project
import ProductPage from './components/product-page/product-page'
import InitializingContainer from './components/initializing-container/initializing-container'
import TopBar from "./components/top-bar/top-bar";
import Page404 from "./components/page-404/page-404";
import ProductListPage from "./components/product-list-page/product-list-page";
import CartPage from "./components/cart-page/cart-page";
import OrderPage from "./components/order-page/order-page";

// some test changes
console.log(23123123);
console.log(23123123);
console.log(23123123);

ReactDOM.render(
  <div className="app-wrapper">
    <Provider store={store}>
      <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
        <InitializingContainer/>
        <TopBar/>
        <div className="container">
          <Switch>
            <Route exact path="/" render={(props) => <ProductListPage {...props}/>}/>
            <Route exact path="/products/:id/" render={(props) => <ProductPage {...props}/>}/>
            <Route exact path="/orders/:id/" render={(props) => <OrderPage {...props}/>}/>
            <Route exact path="/cart/" render={(props) => <CartPage {...props}/>}/>
            <Route exact path="" render={() => <Page404/>}/>
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
    <NotificationContainer/>
  </div>,
  document.getElementById('react-root')
);
