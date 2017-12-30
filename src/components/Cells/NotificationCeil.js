'use strict';

import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/FontAwesome'

// Utils
import colors from './../../Utils/colors';

const NotificationCeil = ({ item, onSelectItem }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={onSelectItem}>
    <View style={styles.rowContainer}>
      <View style={styles.columnIcon}>
        <Icon name={'check'} size={20} color={item.status ? '#333' : '#673AB7'} style={{ backgroundColor: 'transparent' }} />
      </View>
      <View style={styles.columnText}>
        <Text style={[styles.rowTitle, item.status ? null : styles.colorPurple]}>
          {item.title}
        </Text>
        <Text style={[styles.rowDetailsLine, item.status ? null : styles.colorPurple]}>
          {item.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....'}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  button: {
    marginTop: 11,
    marginHorizontal: 15,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 3
  },
  columnIcon: {
    flex: .1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    marginLeft: 8
  },
  columnText: {
    flex: .9
  },
  rowTitle: {
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 8,
    fontSize: 15,
    textAlign: 'left',
    color: '#333'
  },
  rowDetailsLine: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 8,
    fontSize: 12,
    color: 'gray'
  },
  colorPurple: {
    color: colors.purple
  }
});

export default NotificationCeil;
