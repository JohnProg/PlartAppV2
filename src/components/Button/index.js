import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import Colors from './../../utils/Colors';
import styles from './styles';

const Button = props => (
  <TouchableOpacity
    activeOpacity={0.9}
    {...props}
    style={[styles.button, { backgroundColor: props.type === 1 ? Colors.white : Colors.purple }]}
  >
    <Text
      style={[styles.buttonText, { color: props.type === 1 ? Colors.black : Colors.white }]}
    >
      {props.children}
    </Text>
  </TouchableOpacity>
);


Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.number,
};

Button.defaultProps = {
  type: 1,
};

export default Button;
