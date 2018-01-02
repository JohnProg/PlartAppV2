import combineReducers from './combineReducers';
import app from './app';
import auth from './auth';
import me from './me';
import profession from './profession';

export default combineReducers({
  app,
  auth,
  me,
  profession,
});
