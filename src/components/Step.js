import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Text } from 'react-native';

// Components
import H1 from './H1';
// Styles
import styles from './../styles/step.style';

const Step = ({ image, text }) => (
  <ImageBackground style={[styles.slideContainer, styles.slide]} source={image}>
    <H1 style={[styles.logo]}>PUN</H1>
    <Text style={styles.captionBoxBodyText}>{text}</Text>
  </ImageBackground>
);

Step.propTypes = {
  image: PropTypes.number,
  text: PropTypes.string,
};

Step.defaultProps = {
  image: 0,
  text: '',
};

export default Step;
