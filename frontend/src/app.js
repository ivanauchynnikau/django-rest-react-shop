import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from './configureStore';
import {Container} from "@material-ui/core";

// Project
import Main from './components/main/main'
import TopBar from './components/top-bar/top-bar'


const store = configureStore(/* provide initial state if any */);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
      <Switch> { /* your usual react-router v4/v5 routing */}
        <div className="app-wrapper">
          <TopBar/>
          <Route exact path="/" render={() => <Main/>}/>
        </div>
      </Switch>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('react-root')
);
