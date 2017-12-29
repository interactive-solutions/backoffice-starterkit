import { combineReducers } from 'redux';
import locationReducer from './location';
import { userReducer } from './user';

export const rootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer.handle.bind(userReducer),
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
};

export default rootReducer;
