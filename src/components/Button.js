import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from './../utils/Colors';

export default ({ onPress, children, type = 1 }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => onPress()}
    style={[styles.button, { backgroundColor: type == 1 ? Colors.white : Colors.purple }]}>
    <Text style={[styles.buttonText, { color: type == 1 ? '#111' : Colors.white }]}>{children}</Text>
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
