import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './containers/AppContainer'
import store from './store';
import routes from './routes';

ReactDOM.render(
  <AppContainer store={store} routes={routes(store)}/>,
  document.getElementById('root')
)