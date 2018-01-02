import { StyleSheet } from 'react-native';
import Colors from './../utils/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  introScreenScroll: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: Colors.purple,
  },
  textField: {
    height: 40,
    padding: 4,
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 4,
    fontSize: 13,
  },
});

module.exports = styles;
