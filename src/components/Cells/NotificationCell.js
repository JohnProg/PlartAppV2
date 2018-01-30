import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const NotificationCell = ({ item, onSelectItem }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={onSelectItem}
  >
    <View style={styles.rowContainer}>
      <View style={styles.columnIcon}>
        <Icon name="check" size={20} color={item.status ? '#333' : '#673AB7'} style={{ backgroundColor: 'transparent' }} />
      </View>
      <View style={styles.columnText}>
        <Text style={[styles.rowTitle, item.status ? null : styles.colorPurple]}>
          {item.title}
        </Text>
        <Text style={[styles.rowDetailsLine, item.status ? null : styles.colorPurple]}>
          {item.description}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

NotificationCell.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
  item: PropTypes.shape({}).isRequired,
};

export default NotificationCell;
