import { StyleSheet } from 'react-native';
import Colors from './../../utils/Colors';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.blackWithOpacity,
  },
  modalBody: {
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.iosBlue,
  },
  containerTwoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderRadius: 8,
  },
  containerItemTwoGrid: {
    flex: 0.4,
  },
});

module.exports = styles;
