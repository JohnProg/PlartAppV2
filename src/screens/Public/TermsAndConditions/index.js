import React, { Component } from 'react';
import { Platform, View, WebView } from 'react-native';

// Components

 const TermsAndConditionsScreen = ({navigator}) => (
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
  </View>
);

export default TermsAndConditionsScreen;

