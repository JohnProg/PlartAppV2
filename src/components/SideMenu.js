'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import SideMenu from 'react-native-side-menu';

// Components
import { ImageLoader } from './Loader';

// Pages
import Tutorial from '../Pages/Tutorial';

// Utils
import api from '../Utils/api';
import helpers from './../Utils/helpers';

const width = Dimensions.get('window').width;

import styles from '../Styles/menu.style.js';

const AVATAR_SIZE = 80;

class SidebarContainer extends Component {
  animationStyle = (value) => {
    const openMenuOffset = width * 2 / 3;
    return {
      transform: [{
        translateX: value.interpolate({
          inputRange: [0, openMenuOffset],
          outputRange: [0, openMenuOffset - 70]
        })
      }, {
        scaleX: value.interpolate({
          inputRange: [0, openMenuOffset],
          outputRange: [1, 0.7]
        })
      }, {
        scaleY: value.interpolate({
          inputRange: [0, openMenuOffset],
          outputRange: [1, 0.7]
        })
      }]
    }
  }

  render() {
    return (
      <SideMenu {...this.props}
        animationStyle={this.animationStyle}
        disableGestures={true}>
        {this.props.children}
      </SideMenu>
    )
  }
}

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.getCurrentUser() });
  }

  logout = () => {
    Alert.alert(
      'Alert Title',
      'Estas seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar'
        },
        {
          text: 'Si',
          onPress: () => {
            AsyncStorage.removeItem('user').then(() => {
              this.props.toggle();
              this.props.setCurrentUser({});
              this.props.navigator.resetTo({ component: Tutorial });
            });
          }
        }
      ]
    )
  }

  render() {
    let { user } = this.state;

    return (
      <ScrollView
        scrollsToTop={false}
        contentContainerStyle={styles.containerMenu}>
        <View style={{ alignItems: 'center' }}>
          <ImageLoader
            source={helpers.setImageByDefault(user, 'photo')}
            style={[styles.avatar, { width: AVATAR_SIZE, height: AVATAR_SIZE }]}
            indicatorStyle={{ flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)' }} />
          <Text style={styles.sectionSpeakerText}>
            {`${user.first_name} ${user.last_name}`.length > 13 ? `${user.first_name} ${user.last_name}`.slice(0, 13) + '...' : `${user.first_name} ${user.last_name}`}
          </Text>
          <Text style={styles.sectionTitleText}>
            {user.username && user.username.length > 13 ? `${user.username.slice(0, 13)}...` : user.username}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.logout()}>
          <Text style={styles.item}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.logout()}>
          <Text style={styles.item}>Salir</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export { SidebarContainer, Menu };
