'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Modal, Platform, Text, View } from 'react-native';

import styles from './loader.style.js';
const SIZES = ['small', 'normal', 'large'];

export default class OverlayLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible }
  }

  close = () => {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps
    this.setState({ visible })
  }

  _renderSpinner() {
    const { visible } = this.state

    if (!visible)
      return (
        <View />
      );

    let spinner = (
      <View style={{flex: 1}} key={'spinner' + Date.now()}>
        <View
          style={[
            styles.background,
            { backgroundColor: 'rgba(0, 0, 0, 0.25)' }
          ]}>
          <ActivityIndicator
            color={ Platform.OS === 'ios' ? '#fff' :  null}
            size='large'
            style={{ flex: 1 }}
            />
        </View>
      </View>
    );
    return (
      <Modal onRequestClose={() => this.close()} visible={visible} transparent>
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }

};
