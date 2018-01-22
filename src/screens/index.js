import { Navigation } from 'react-native-navigation';
import { Intro, Login, PersonalInfo, Professions, Register, Tutorial } from './Public';
import { Ads, MyAds, MyAdDetail, Notifications, Profile } from './Private/';
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
      Intro,
      Login,
      PersonalInfo,
      Professions,
      Drawer,
      Splash,
      Register,
      Tutorial,
      Ads,
      MyAds,
      MyAdDetail,
      Notifications,
      Profile,
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
      // animationType: 'fade',
      tabs: [
        {
          label: 'Anuncios',
          screen: 'plartApp.Ads',
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
                title: 'Acerca de Nosotros',
                id: 'aboutUs',
                icon: iconsMap.infoOutline,
              },
            ],
          },
        },
        {
          label: 'Mis anuncios',
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
            rightButtons: [
              {
                title: 'Acerca de Nosotros',
                id: 'aboutUs',
                icon: iconsMap.infoOutline,
              },
            ],
          },
        },
        {
          label: 'Mensajes',
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
            rightButtons: [
              {
                title: 'Acerca de Nosotros',
                id: 'aboutUs',
                icon: iconsMap.infoOutline,
              },
            ],
          },
        },
        {
          label: 'Profile',
          screen: 'plartApp.Profile',
          icon: iconsMap.personOutline,
          selectedIcon: iconsMap.personOutline,
          title: 'Profile',
        },
      ],
      tabsStyle: {
        tabBarButtonColor: Colors.gray,
        tabBarSelectedButtonColor: Colors.purple,
        tabBarBackgroundColor: Colors.white,
        tabFontFamily: 'BioRhyme-Bold',
      },
      appStyle: {
        drawUnderTabBar: false,
        tabBarButtonColor: Colors.gray,
        tabBarSelectedButtonColor: Colors.purple,
        tabBarBackgroundColor: Colors.white,
        tabFontFamily: 'BioRhyme-Bold',
        navBarButtonColor: Colors.black,
        navBarTextColor: Colors.black,
        navigationBarColor: '#003a66',
        navBarBackgroundColor: Colors.white,
        statusBarColor: Colors.purpleDark,
      },
      drawer: {
        left: {
          screen: 'plartApp.Drawer',
        },
      },
    });
  }
}
