import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);

export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

let height = 150;

const styles = StyleSheet.create({
  buttonTextCard: {
    fontSize: 16,
    color: 'white',
  },
  buttonCard: {
    flex: 0.5,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#673AB7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCardType1: {
    backgroundColor: '#673AB7',
    marginLeft: 5
  },
  buttonCardType2: {
    backgroundColor: 'white',
    marginRight: 5
  },
  banner: {
    height: height,
  },
  overlayBanner: {
    position: "absolute",
    height: height,
    width: viewportWidth - 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
  },
  companyLogo: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    position: "absolute",
    top: 30,
    left: 40
  },
  companyName: {
    position: "absolute",
    top: 47,
    left: 110,
    padding: 2,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      borderRadius: Platform.OS === 'ios' ? 6 : 0,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
  },
  slide: {
      width: itemWidth,
      paddingHorizontal: itemHorizontalMargin,
  }
});

module.exports = styles;
