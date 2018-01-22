import { StyleSheet } from 'react-native';

import Colors from './../../../utils/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 60,
    paddingBottom: 100,
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 22,
    paddingBottom: 5,
  },
  description: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 15,
  },
});

module.exports = styles;
