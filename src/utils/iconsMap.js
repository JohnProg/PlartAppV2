import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';

const iOS = Platform.OS === 'ios';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const iconsTest = {
  'ios-person': [30, '#bbb'],
  'ios-person--big': [50, '#bbb'],

  'ios-person--active': [30, '#fff'],
  'ios-person--active--big': [50, '#fff'],
  'ios-person--active--very-big': [100, '#fff'],

  'ios-people': [30, '#bbb'],
  'ios-people--active': [30, '#fff'],

  'ios-keypad': [30, '#bbb'],
  'ios-keypad--active': [30, '#fff'],

  'ios-chatbubbles': [30, '#bbb'],
  'ios-chatbubbles--active': [30, '#fff'],

  // Use other Icon provider, see the logic at L39
  facebook: [30, '#bbb', FontAwesome],
  'facebook--active': [30, '#fff', FontAwesome],
};

const icons = {
  menu: { icon: 'menu', color: 'black', size: 24 },
  search: { icon: 'search', color: 'black', size: 24 },
  announcement: { icon: 'announcement', color: 'black', size: 24 },
  cardTravel: { icon: 'card-travel', color: 'black', size: 24 },
  notifications: { icon: 'notifications-none', color: 'white', size: 24 },
  personOutline: { icon: 'person-outline', color: 'white', size: 24 },
  businessCenter: { icon: 'business-center', color: 'white', size: 24 },
  infoOutline: { icon: 'info-outline', color: 'white', size: 24 },
  back: { icon: iOS ? 'chevron-left' : 'arrow-back', color: 'white', size: 24 },
  forward: iOS ? { icon: 'chevron-right', color: 'white', size: 40 } : { icon: 'arrow-forward', color: 'white', size: 24 }
};

// const defaultIconProvider = Ionicons;
// let iconsMap = {};
// let iconsLoaded = new Promise((resolve, reject) => {
//   new Promise.all(
//     Object.keys(icons).map(iconName => {
//       const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
//       return Provider.getImageSource(
//         iconName.replace(replaceSuffixPattern, ''),
//         icons[iconName][0],
//         icons[iconName][1]
//       )
//     })
//   ).then(sources => {
//     Object.keys(icons)
//       .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])
//     // Call resolve (and we are done)
//     resolve(true);
//   })
// });

// export {
//   iconsMap,
//   iconsLoaded,
// };

// export const iconsMap = {};
const iconsMap = {};
const iconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map((iconName) => {
      const icon = icons[iconName];
      const Provider = MaterialIcons;
      return Provider.getImageSource(
        icon.icon,
        icon.size,
        icon.color,
      );
    }),
  ).then((sources) => {
    Object.keys(icons)
      .forEach((iconName, idx) => iconsMap[iconName] = sources[idx]);
    resolve(true);
  });
});

export {
  iconsLoaded,
  iconsMap,
};
