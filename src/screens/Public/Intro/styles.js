import { StyleSheet } from 'react-native';
import Colors from './../../../utils/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  scrollContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: Colors.purple,
    alignItems: 'center',
  },
  btnRegisterStyle: {
    marginBottom: 20,
  },
});

module.exports = styles;
