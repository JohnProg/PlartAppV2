import { Dimensions, Platform, StyleSheet } from 'react-native';
import Colors from './../../utils/Colors';

const styles = StyleSheet.create({
  button: {
    marginTop: 11,
    marginHorizontal: 15,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  columnIcon: {
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    marginLeft: 8,
  },
  cell_container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 3,
  },
  columnText: {
    flex: 0.9,
  },
  rowTitle: {
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 8,
    fontSize: 15,
    textAlign: 'left',
    color: Colors.black,
  },
  rowDetailsLine: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 8,
    fontSize: 12,
    color: Colors.gray,
  },
  colorPurple: {
    color: Colors.purple,
  },
});

module.exports = styles;
