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
    fontSize: 20,
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
    padding: 15,
  },
  pickerView: {
    marginTop: 9,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 10,
  },
});

module.exports = styles;
