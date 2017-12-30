import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { PersistGate } from 'redux-persist/es/integration/react';
import registerScreens from './screens';
import configureStore from './store/configureStore';

// screen related book keeping
registerScreens(store, Provider);
const { store, persistor } = configureStore();
// registerScreenVisibilityListener();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'plartApp.TutorialScreen',
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  animationType: 'fade',
});
