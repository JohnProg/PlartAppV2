import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AboutUs, Intro, Login, PersonalInfo, Professions, Register, Tutorial } from './Public';
import { CreateAd, ListAds, MyAds, MyAdDetail, Notifications, DetailProfile, EditProfile } from './Private/';
import Notification from './../components/Notification';
import { Drawer, Splash } from './Common';
import { iconsLoaded, iconsMap } from './../utils/iconsMap';
import Colors from './../utils/Colors';

export default class Application {
  constructor(store, persistor, Provider) {
    this.configureScreens(store, Provider);
    this.iconsLoaded = false;
    this.startAppWithScreen({ screen: 'plartApp.Splash' });
    iconsLoaded
      .then(() => {
        this.iconsLoaded = true;
      }).catch((error) => {
        console.error(error);
      });
  }

  configureScreens = (store, Provider) => {
    const screens = {
      AboutUs,
      Intro,
      Login,
      PersonalInfo,
      Professions,
      Drawer,
      Splash,
      Register,
      Tutorial,
      CreateAd,
      ListAds,
      MyAds,
      MyAdDetail,
      Notifications,
      Notification,
      DetailProfile,
      EditProfile,
    };
    Object.keys(screens).map(key => Navigation.registerComponent(`plartApp.${key}`, () => screens[key], store, Provider));
  }

  startAppWithScreen = (opts) => {
    if (this.iconsLoaded) {
      this.startApp(opts);
    } else {
      iconsLoaded
        .then(() => {
          this.iconsLoaded = true;
          this.startApp(opts);
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  startApp = ({ screen, passProps, showDrawer = false }) => {
    const app = {
      screen: {
        screen,
        passProps,
      },
    };

    Navigation.startSingleScreenApp(Object.assign(
      app,
      showDrawer ? { drawer: { left: { screen: 'plartApp.Drawer' } } } : {},
    ));
  };

  startPrivateApp = () => {
    Navigation.startTabBasedApp({
      // animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
      tabs: [
        {
          label: Platform.OS === 'ios' ? 'Anuncios' : '',
          screen: 'plartApp.ListAds',
          icon: iconsMap.announcement,
          title: 'Anuncios',
          navigatorButtons: {
            leftButtons: [
              {
                title: 'Menu',
                id: 'menu',
                icon: iconsMap.menu,
              },
            ],
            rightButtons: [
              {
                title: 'Filtros',
                id: 'filters',
                icon: iconsMap.filters,
              },
              {
                title: 'Search',
                id: 'search',
                icon: iconsMap.search,
              },
            ],
          },
        },
        {
          label: Platform.OS === 'ios' ? 'Mis anuncios' : '',
          screen: 'plartApp.MyAds',
          icon: iconsMap.cardTravel,
          title: 'Mis anuncios',
          navigatorButtons: {
            leftButtons: [
              {
                title: 'Menu',
                id: 'menu',
                icon: iconsMap.menu,
              },
            ],
          },
        },
        {
          label: Platform.OS === 'ios' ? 'Mensajes' : '',
          screen: 'plartApp.Notifications',
          icon: iconsMap.notifications,
          title: 'Mensajes',
          navigatorButtons: {
            leftButtons: [
              {
                title: 'Menu',
                id: 'menu',
                icon: iconsMap.menu,
              },
            ],
          },
        },
        {
          label: Platform.OS === 'ios' ? 'Profile' : '',
          screen: 'plartApp.DetailProfile',
          icon: iconsMap.personOutline,
          selectedIcon: iconsMap.personOutline,
          title: 'Profile',
        },
      ],
      tabsStyle: {
        tabBarButtonColor: Colors.gray,
        tabBarSelectedButtonColor: Colors.purple,
        tabBarBackgroundColor: Colors.white,
      },
      appStyle: {
        drawUnderTabBar: false,
        tabBarButtonColor: Colors.gray,
        tabBarSelectedButtonColor: Colors.purple,
        tabBarBackgroundColor: Colors.white,
        tabFontFamily: 'BioRhyme-Bold',
        navBarButtonColor: Colors.black,
        navBarTextColor: Colors.black,
        navigationBarColor: Colors.black,
        navBarBackgroundColor: Colors.white,
        statusBarColor: Colors.purpleDark,
      },
      drawer: {
        left: {
          screen: 'plartApp.Drawer',
        },
        type: 'MMDrawer',
        animationType: 'slide',
        disableOpenGesture: true,
      },
    });
  }
}
