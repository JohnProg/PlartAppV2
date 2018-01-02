import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'root',
  storage,
};

export default function combineReducers(reducers) {
  return persistCombineReducers(config, reducers);
}
