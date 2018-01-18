import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import history from 'utils/history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../modules/index';
import { promiseMiddleware } from '../middleware/promise-middleware';

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      // maxAge sets the number actions Redux DevTools should store. default 50.
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    rootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('../modules/index', () => {
      const reducers = require('../modules/index').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
