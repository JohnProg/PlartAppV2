import { StyleSheet, Platform } from 'react-native';

import Colors from './../utils/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: Colors.white,
  },
  textField: {
    height: 45,
  },
  datePickerFieldPlaceholder: {
    marginTop: (Platform.OS === 'ios') ? 6 : 10,
    marginLeft: (Platform.OS === 'ios') ? 0 : -5,
  },
  pickerFieldLabel: {
    marginTop: (Platform.OS === 'ios') ? 6 : 10,
    marginLeft: (Platform.OS === 'ios') ? 0 : 5,
  },
  textEditAvatar: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.white,
    top: -58,
  },
  avatar: {
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
