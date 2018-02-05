import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './user';
import { resellerReducer } from './resellers';
import { modalReducer } from './modal';
import { toastrReducer } from './toastr';

export const rootReducer = (asyncReducers) =>
  combineReducers({
    location: routerReducer,
    form: formReducer,
    user: userReducer.handle,
    resellers: resellerReducer.handle,
    modal: modalReducer.handle,
    toastr: toastrReducer.handle,
    ...asyncReducers
  });


export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer; // eslint-disable-line
  store.replaceReducer(rootReducer(store.asyncReducers));
};

export default rootReducer;
