import { StyleSheet } from 'react-native';
import Colors from './../../../utils/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  cell_container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

module.exports = styles;
