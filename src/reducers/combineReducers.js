import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'plart-app',
  version: 2,
  storage,
  debug: true,
};

export default function combineReducers(reducers) {
  return persistCombineReducers(config, reducers);
}
