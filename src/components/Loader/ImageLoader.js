'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Image, View, Text,Platform } from 'react-native';

export default class ImageLoader extends Component {
  constructor(props){
    super(props);
    this.state = {
      isImageLoading: true,
      progress: 0,
    }
  }

  render() {
    const { indicatorStyle, style, source, imageLoaded } = this.props;
    const { isImageLoading } = this.state;

    return <Image
              onLoadProgress={(e) => this.setState({progress: Math.max(0, Math.round(100 * e.nativeEvent.written / e.nativeEvent.total))}) }
              onLoadEnd={() => {
                this.setState({isImageLoading: false});
                if (imageLoaded) imageLoaded();
              }}
              source={source}
              style={style}
              resizeMode='cover'>
              { isImageLoading ?
                <ActivityIndicator
                    animating={true}
                    color={ Platform.OS === 'ios' ? '#673AB7' :  null}
                    size={'large'}
                    style={indicatorStyle}/> : null }
           </Image>
    }
}
