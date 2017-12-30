import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from './../utils/colors';

export default ({ onPress, children, type = 1 }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => onPress()}
    style={[styles.button, { backgroundColor: type == 1 ? 'white' : colors.purple }]}>
    <Text style={[styles.buttonText, { color: type == 1 ? '#111' : 'white' }]}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  button: {
    height: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 20,
    borderRadius: 8,
  },
});
