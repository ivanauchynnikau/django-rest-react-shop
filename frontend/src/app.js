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
import TopBar from './components/top-bar/top-bar'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
      <Switch>
        <div className="app-wrapper">
          <Route exact path="/" render={() => <Main/>}/>
          <Route exact path="/product" render={() => (<div>Match</div>)}/>
        </div>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-root')
);
