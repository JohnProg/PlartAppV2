import combineReducers from './combineReducers';
import ad from './ad';
import app from './app';
import auth from './auth';
import me from './me';
import notification from './notification';
import location from './location';
import profession from './profession';

export default combineReducers({
  ad,
  app,
  auth,
  me,
  notification,
  location,
  profession,
});
