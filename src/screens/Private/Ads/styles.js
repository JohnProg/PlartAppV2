import { Platform, StyleSheet } from 'react-native';
import Colors from './../../../utils/Colors';

const styles = StyleSheet.create({
  // List Ads
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
  },
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textWhite: {
    color: Colors.white,
  },
  // Create Ad
  contentContainerScrollView: {
    paddingBottom: 60,
  },
  contentContainer: {
    padding: 40,
    paddingTop: 30,
    backgroundColor: Colors.purple,
  },
  center: {
    alignItems: 'center',
  },
  textFieldBox: {
    marginTop: 9,
    borderColor: Colors.white,
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
    color: Colors.black,
    paddingVertical: Platform.OS === 'ios' ? 13.5 : 8,
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
});

module.exports = styles;
