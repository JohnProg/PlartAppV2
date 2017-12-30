'use strict';

import React from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

import styles from './loader.style.js';

const ContainerLoader = ({color, isLoading}) =>
  <View style={[styles.container, styles.backgroundColorPurple]}>
    <ActivityIndicator
        style={{margin: 10}}
        animating={isLoading}
        color={ Platform.OS === 'ios' ? (color || '#fff') :  null}
        size={'large'}/>
    <Text style={{color: '#fff', fontFamily: 'ArialRoundedMTBold',}}>Cargando...</Text>
  </View>

export default ContainerLoader;
