import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router' // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from './configureStore'

const store = configureStore(/* provide initial state if any */);

// Project
import Main from './components/main/main'
import Product from './components/product/product'
import TopBar from "./components/top-bar/top-bar";
import Page404 from "./components/page-404/page-404";

ReactDOM.render(
  <div className="app-wrapper">
    <Provider store={store}>
      <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
      <TopBar/>
        <Switch>
          <Route exact path="/" render={(props) => <Main {...props}/>}/>
          <Route exact path="/products/:id/" render={(props) => <Product {...props}/>}/>
          <Route exact path="" render={() => <Page404/>}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  </div>,
  document.getElementById('react-root')
);
