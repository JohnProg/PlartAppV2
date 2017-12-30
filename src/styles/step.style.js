import {
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  captionBoxBodyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    width: 300
  },
  slideContainer: {
    flexGrow: 1,
    height: height,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  purpleBG: {
    backgroundColor: '#673AB7',
    padding: 10
  },
  logo: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0
  }
});

module.exports = styles;
