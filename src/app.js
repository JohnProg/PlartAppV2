import { Provider } from 'react-redux';
import Application from './screens';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

export default new Application(store, persistor, Provider);
