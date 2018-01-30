import { StyleSheet } from 'react-native';
import Colors from './../../utils/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessageStyle: {
    textAlign: 'center',
    color: Colors.white,
  },
  footerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: Colors.blue,
    marginLeft: 7,
  },
});

module.exports = styles;
