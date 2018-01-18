import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './user';
import { resellerReducer } from './resellers';
import { modalReducer } from './modal';

export const rootReducer = (asyncReducers) => {
  return combineReducers({
    location: routerReducer,
    form: formReducer,
    user: userReducer.handle,
    resellers: resellerReducer.handle,
    modal: modalReducer.handle,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
};

export default rootReducer;
