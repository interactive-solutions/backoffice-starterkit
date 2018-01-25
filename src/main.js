import 'semantic-ui-css/semantic.min.css';
import 'react-table/react-table.css';
import 'api';
import Raven from 'raven-js';
import React from 'react';
import { render } from 'react-dom';
import { App } from 'containers/App';
import routes from 'routes/index';
import createStore from 'redux/store/create-store';
import history from './utils/history';
import './css/global.scss';

// Setup raven to log to https://sentry.interactivesolutions.se
if (__PROD__) {
  Raven
    .config('https://124c13c0c3a74d9b8ab0284daee64431@sentry.interactivesolutions.se/3')
    .install();
}


// Add service worker in production
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Create root component and mount
const store = createStore();
const root = (
  <App store={store} routes={routes()} history={history}/>
);

render(root, document.getElementById('react-root'));


// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
