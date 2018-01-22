import colors from 'material-colors'

export const navigatorStyle = {
  navBarTextColor: colors.white, // change the text color of the title (remembered across pushes)
  navBarBackgroundColor: colors.cyan['500'], // change the background color of the nav bar (remembered across pushes)
  navBarButtonColor: colors.white, // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
  navBarHidden: false, // make the nav bar hidden
  navBarHideOnScroll: false, // make the nav bar hidden only after the user starts to scroll
  navBarTranslucent: false, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
  navBarTransparent: false, // make the nav bar transparent, works best with drawUnderNavBar:true,
  topBarElevationShadowEnabled: false, // Android only, default: true. Disables TopBar elevation shadow on Lolipop and above
  navBarNoBorder: false, // hide the navigation bar bottom border (hair line). Default false
  drawUnderNavBar: false, // draw the screen content under the nav bar, works best with navBarTranslucent:true
  drawUnderTabBar: false, // draw the screen content under the tab bar (the tab bar is always translucent)
  statusBarBlur: false, // blur the area under the status bar, works best with navBarHidden:true
  navBarBlur: false, // blur the entire nav bar, works best with drawUnderNavBar:true
  tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
  statusBarColor: colors.cyan['700'], // change the color of the status bar. Android only
  statusBarHideWithNavBar: false, // hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
  statusBarHidden: false, // make the status bar hidden regardless of nav bar state
  statusBarTextColorScheme: 'light', // text color of status bar, 'dark' / 'light' (remembered across pushes)
  statusBarTextColorSchemeSingleScreen: 'light', // same as statusBarTextColorScheme but does NOT remember across pushes
  screenBackgroundColor: 'white', // Default screen color, visible before the actual react view is rendered
  orientation: 'portrait' // Sets a specific orientation to a modal and all screens pushed to it. Default: 'auto'. Supported values: 'auto',
}

export const themeColors = {
  primaryColor: '#00bcd4',
  primaryColorDark: '#0097a7',
  accentColor: '#b09b2c'
}

export const categoryIcons = {
  garbage: require('./images/icon_garbage.png'),
  fun: require('./images/icon_fun.png'),
  deeds: require('./images/icon_good_deed.png')
}
export const categoryColors = {
  garbage: 'rgba(129,199,132,.25)',
  fun: 'rgba(255,224,130,.25)',
  deeds: 'rgba(240,98,146,.25)'
}

// const images = {
//   icons: {
//     tabs: {
//       events: require('../images/tab-events.png'),
//       eventsSelected: require('../images/tab-events-selected.png'),
//       social: require('../images/tab-social.png'),
//       socialSelected: require('../images/tab-social-selected.png'),
//     },
//     mapMarker: require('../images/map_marker.png'),
//   },
//   placeHolder: {
//     large: require('../images/placeholder.png'),
//     small: require('../images/placeholder_square.png'),
//   },
// };

// export { images };