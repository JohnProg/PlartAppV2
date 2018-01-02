import { Navigation } from 'react-native-navigation';

import init from './../actions/appActions';

import Tutorial from './Public/Tutorial';
import Intro from './Public/Intro';
import Login from './Public/Login';
import Register from './Public/Register';
import Professions from './Public/Professions';
import PersonalInfo from './Public/PersonalInfo';

export default class Application {
  constructor(store, persistor, Provider) {
    this.store = store;
    this.persistor = persistor;
    this.provider = Provider;
    this.iconsLoaded = false;

    this.configureScreens(store, Provider);
  }

  configureScreens = (store, Provider) => {
    const screens = {
      Tutorial,
      Intro,
      Login,
      Register,
      Professions,
      PersonalInfo,
    };

    Object.keys(screens).map(key => Navigation.registerComponent(`plartApp.${key}`, () => screens[key], store, Provider));
  }

  run() {
    this.store.dispatch(init());
  }

  startAppWithScreen = (opts) => {
    this.startApp(opts);
  }

  startApp = ({ screen, passProps, showDrawer = false }) => {
    const app = {
      screen: {
        screen,
        passProps,
        // navigatorStyle: {
        //   tabBarHidden: true,
        //   drawUnderTabBar: true,
        //   disabledBackGesture: true,
        // },
      },
    };

    Navigation.startSingleScreenApp(Object.assign(
      app,
      showDrawer ? { drawer: { left: { screen: 'plartApp.Drawer' } } } : {},
    ));
  };
}
