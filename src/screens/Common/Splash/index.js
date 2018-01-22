import React from 'react';
import { View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/Ionicons';

import H1 from './../../../components/H1';
import Colors from './../../../utils/Colors';
import styles from './styles';

const Splash = () => (
  <View style={styles.mainContainer}>
    <H1>Achambear</H1>
    <Icon name="md-people" size={200} color={Colors.white} />
  </View>
);

Splash.navigatorStyle = { navBarHidden: true };
export default Splash;
