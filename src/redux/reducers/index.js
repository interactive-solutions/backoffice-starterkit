import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './user';
import { resellerReducer } from './resellers';

export const rootReducer = (asyncReducers) => {
  return combineReducers({
    location: routerReducer,
    form: formReducer,
    user: userReducer.handle.bind(userReducer),
    resellers: resellerReducer.handle.bind(resellerReducer),
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
};

export default rootReducer;
