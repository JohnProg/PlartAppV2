import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';
import rootReducer from './../reducers';
import rootNavigator from './../app';

const middlewares = [promise(), thunk];

if (__DEV__) middlewares.push(createLogger());

const devtool =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composer = !!devtool
  ? compose(applyMiddleware(...middlewares), devtool)
  : compose(applyMiddleware(...middlewares));

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composer,
  );
  const persistor = persistStore(store, {}, () => {
    rootNavigator.run();
  });

  return { persistor, store };
};

export default configureStore;

