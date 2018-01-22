import React, { Component } from 'react';
import { ActivityIndicator, Platform, ImageBackground } from 'react-native';

export default class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageLoading: true,
    };
  }

  render() {
    const { indicatorStyle, style, source, imageLoaded } = this.props;
    const { isImageLoading } = this.state;
    const animating = true;

    return (
      <ImageBackground
        onLoadEnd={() => {
          this.setState({ isImageLoading: false });
          if (imageLoaded) imageLoaded();
        }}
        source={source}
        style={style}
        imageStyle={style}
        resizeMode="cover"
      >
        {isImageLoading ?
          <ActivityIndicator
            animating={animating}
            color={Platform.OS === 'ios' ? '#673AB7' : null}
            size="large"
            style={indicatorStyle}
          /> : null}
      </ImageBackground>
    );
  }
}
