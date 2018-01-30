import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import Colors from './../utils/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.semiTransparent4,
    marginHorizontal: 80,
    borderRadius: 5,
  },
  content: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
});

const Notification = props => (
  <View style={styles.container}>
    <Text style={styles.content}>{props.body}</Text>
  </View>
);

Notification.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Notification;
