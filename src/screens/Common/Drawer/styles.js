import { Dimensions, StyleSheet } from 'react-native';
import Colors from './../../../utils/Colors';

const AVATAR_SIZE = 80;
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.purple,
    paddingTop: 50,
    paddingHorizontal: 50,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: Colors.white,
    fontSize: 24,
    paddingVertical: 5,
    textAlign: 'center',
  },
  sectionTitleText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 15,
  },
});

module.exports = styles;
