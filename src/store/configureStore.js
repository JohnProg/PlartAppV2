import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';
import rootReducer from './../reducers';
import storeLoaded from './../actions/appActions';

const middlewares = [promise(), thunk];

if (__DEV__) middlewares.push(createLogger());

const composer = compose(applyMiddleware(...middlewares));
const configureStore = () => {
  const store = createStore(
    rootReducer,
    undefined,
    composer,
  );
  const persistor = persistStore(store, {}, () => {
    store.dispatch(storeLoaded());
  });

  return { persistor, store };
};

export default configureStore;

