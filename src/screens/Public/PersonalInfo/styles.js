import { Platform, StyleSheet } from 'react-native';

import Colors from './../../../utils/Colors';

const styles = StyleSheet.create({
  contentContainer: {
    padding: 40,
    paddingTop: 0,
    backgroundColor: Colors.white,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 60,
  },
  containerTwoGrid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerItemTwoGrid: {
    flex: 0.45,
  },
  center: {
    alignItems: 'center',
  },
  textFieldBox: {
    marginTop: 9,
    borderColor: Colors.gray,
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
    color: Colors.black,
    paddingVertical: Platform.OS === 'ios' ? 13.5 : 8,
  },
  buttonPickerStyle: {
    minHeight: 44,
  },
  textButtonPickerStyle: {
    paddingVertical: 0,
  },
  textEditAvatar: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.white,
    top: -58,
  },
  avatarImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  avatarButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

module.exports = styles;
