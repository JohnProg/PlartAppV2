import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const NotificationCeil = ({ item, onSelectItem }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={onSelectItem}>
    <View style={styles.rowContainer}>
      <View style={styles.columnIcon}>
        <Icon name="check" size={20} color={item.status ? '#333' : '#673AB7'} style={{ backgroundColor: 'transparent' }} />
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
);


export default NotificationCeil;
