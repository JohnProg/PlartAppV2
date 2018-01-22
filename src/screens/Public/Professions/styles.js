import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

const { height } = Dimensions.get('window');
const circleSize = height / 8;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.black,
    fontSize: 20,
    textAlign: 'center',
  },
  professionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  professionOverlay: {
    justifyContent: 'center',
    height: circleSize,
    width: circleSize,
    backgroundColor: Colors.semiTransparent,
    borderRadius: circleSize / 2,
  },
  profession: {
    height: circleSize,
    margin: 10,
    width: circleSize,
  },
  professionImage: {
    height: circleSize,
    width: circleSize,
  },
  professionText: {
    color: Colors.white,
    marginHorizontal: 5,
    fontSize: 13,
    textAlign: 'center',
  },
  professionSelected: {
    backgroundColor: Colors.semiTransparent2,
  },
});

module.exports = styles;
