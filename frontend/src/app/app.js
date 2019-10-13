import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './../configureStore';
const store = configureStore(/* provide initial state if any */);


import Main from './../components/main/main'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
      <Switch> { /* your usual react-router v4/v5 routing */ }
        <Switch>
          <Route exact path="/" render={() => <Main/>} />
          <Route exact path="/test" render={() => <Main/>} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-root')
);
