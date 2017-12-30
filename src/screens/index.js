import { Navigation } from 'react-native-navigation';

import TutorialScreen from './Public/TutorialScreen';
import IntroScreen from './Public/IntroScreen';
import LoginScreen from './Public/LoginScreen';
import RegisterScreen from './Public/RegisterScreen';

export default function registerScreens() {
  Navigation.registerComponent('plartApp.TutorialScreen', () => TutorialScreen);
  Navigation.registerComponent('plartApp.IntroScreen', () => IntroScreen);
  Navigation.registerComponent('plartApp.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('plartApp.RegisterScreen', () => RegisterScreen);
}
