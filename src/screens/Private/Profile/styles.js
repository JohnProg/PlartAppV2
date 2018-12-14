import { Dimensions, Platform, StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';
import { AVATAR_SIZE } from './../../../constants';

const screen = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 280;
const styles = StyleSheet.create({
  scrollViewContainerStyle: {
    padding: 40,
    paddingTop: 0,
    backgroundColor: Colors.white,
  },
  parallaxScrollStyle: {
    backgroundColor: Colors.transparent,
  },
  avatarContainerStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  indicatorStyle: {
    flex: 1,
    backgroundColor: Colors.semiTransparent3,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarImageStyle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  userInfoStyle: {
    alignItems: 'center',
  },
  fullNameStyle: {
    color: Colors.white,
    fontSize: 24,
    paddingVertical: 5,
  },
  usernameStyle: {
    color: Colors.white,
    fontSize: 18,
    paddingVertical: 5,
  },
  scrollableTabViewStyle: {
    backgroundColor: Colors.white,
    zIndex: 10,
  },
  underlineStyle: {
    backgroundColor: Colors.purple,
  },
  emptyTabContentStyle: {
    flex: 1,
  },
  textTitleDescription: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  changeAvatarTextStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.purple,
    paddingTop: 10,
  },
  mainSection: {
    padding: 20,
    paddingTop: 5,
  },
  parallaxHeaderStyle: {
    alignItems: 'center',
    paddingTop: 35,
  },
  uploadingCoverText: {
    color: Colors.white,
    fontSize: 20,
  },
  profileText: {
    marginBottom: 5,
  },
  btnEdit: {
    position: 'absolute',
    top: 40,
    right: 30,
    backgroundColor: Colors.white,
    padding: 7,
    borderRadius: 5,
  },
  btnTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCamera: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  coverView: {
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  tabIcon: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  textFieldBox: {
    marginTop: 9,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    marginBottom: 20,
  },
  textField: {
    fontSize: 16,
    paddingLeft: 10,
    paddingVertical: Platform.OS === 'ios' ? 12.3 : 8,
    color: Colors.black,
  },
  descriptionTextField: {
    minHeight: 44,
  },
  buttonPickerStyle: {
    minHeight: 44,
  },
  textButtonPickerStyle: {
    paddingVertical: 0,
  },
  timeLineListContainerStyle: {
    flex: 1,
    padding: 20,
  },
});

module.exports = styles;
