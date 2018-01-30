import { Platform } from 'react-native';

const iOS = Platform.OS === 'ios';
export const AVATAR_SIZE = 120;
export const PARALLAX_HEADER_HEIGHT = 280;
export const icons = {
  menu: { icon: 'menu', color: 'black', size: 24 },
  'menu-white': { icon: 'menu', color: 'white', size: 24 },
  search: { icon: 'search', color: 'black', size: 24 },
  'search-white': { icon: 'search', color: 'white', size: 24 },
  'more-vert': { icon: 'more-vert', color: 'white', size: 24 },
  'info-outline': { icon: 'info-outline', color: 'white', size: 24 },
  back: { icon: iOS ? 'chevron-left' : 'arrow-back', color: 'white', size: 24 },
  forward: iOS ? { icon: 'chevron-right', color: 'white', size: 40 } : { icon: 'arrow-forward', color: 'white', size: 24 },
};
export const genderOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
];
