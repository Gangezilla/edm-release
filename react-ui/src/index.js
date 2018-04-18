import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/containers/app';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import configureStore, { history } from './store/configure-store';

const store = configureStore();

store.subscribe(() => {
  // console.log('index: ', store.getState());
  localStorage.setItem('EDM-Builder', JSON.stringify(store.getState()))
});

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
  </Provider>, document.getElementById('root')
);
