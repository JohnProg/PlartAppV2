import { StyleSheet } from 'react-native';
import Colors from './../../../utils/Colors';

const styles = StyleSheet.create({
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
});

module.exports = styles;
