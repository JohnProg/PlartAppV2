import React, { Component } from 'react';
import { Platform, View, WebView } from 'react-native';

// Components
import Header from './../../Components/Header';

export default ({navigator}) =>
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <WebView
      automaticallyAdjustContentInsets={false}
      source={{uri: 'https://www.plart.pe/'}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      startInLoadingState={true}
      style={{marginTop: Platform.OS === 'ios' ? 64 : 54}}
    />
    <Header
        title="Términos y Condiciones"
        leftText = "OK"
        rightText=" "
        onLeftPress={ () => { navigator.pop(); } } />
  </View>
