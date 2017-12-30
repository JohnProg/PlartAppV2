'use strict';

import React from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

import styles from './loader.style.js';

const SimpleLoader = ({color, isLoading}) =>
  <View style={styles.container}>
    <ActivityIndicator
        style={{margin: 40, flex: 1}}
        animating={isLoading}
        color={ Platform.OS === 'ios' ? (color || '#fff') :  null}
        size={'large'}/>
  </View>

export default SimpleLoader;
