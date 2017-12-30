'use strict';

import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, ListView, Modal, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import styles from '../../Styles/profile.style.js';

// Views
import EditProfilePage from './EditProfilePage';
import IntroPage from './IntroPage';

// Components
import Header from './../../Components/Header';
import { ImageLoader } from '../../Components/Loader';

// Utils
import api from '../../Utils/api';
import helpers from '../../Utils/helpers';
import colors from '../../Utils/colors';
import constants from '../../Utils/constants';

const window = Dimensions.get('window');

const { AVATAR_SIZE, PARALLAX_HEADER_HEIGHT } = constants;

export default class PublicProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoadingAvatar: true,
      user: this.props.user,
      photo: props.photo,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  _renderProfiles(user) {
    if (user["profiles"]) {
      return user.profiles.map((feature, i) => <Text key={i} style={{ marginBottom: 5 }}>{feature.name}: {feature.value || '--'}</Text>)
    }
  }

  updateLoadingAvatar() {
    this.setState({ isLoadingAvatar: false });
  }

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    return <TouchableOpacity
      key={`${name}_${page}`}
      onPress={() => onPressHandler(page)}
      onLayout={onLayoutHandler}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      underlayColor="#aaaaaa">
      <Icon name={name} size={25} color={isTabActive ? '#000' : 'gray'} style={{ backgroundColor: 'transparent' }} />
    </TouchableOpacity>;
  }

  render() {
    let user = this.state.user;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={user.name}
          leftText={<Icon2 name='angle-left' size={30} />}
          onLeftPress={() => this.props.navigator.pop()}
        />
        <ParallaxScrollView
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          renderForeground={() => (
            <View key="parallax-header" style={styles.parallaxHeader}>
              <ImageLoader
                source={helpers.setImageByDefault(user, 'photo')}
                indicatorStyle={{ flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)', borderRadius: AVATAR_SIZE / 2 }}
                style={[styles.avatar, { width: AVATAR_SIZE, height: AVATAR_SIZE }]}
                imageLoaded={this.updateLoadingAvatar.bind(this)} />
              <Text style={styles.sectionSpeakerText}>
                {`${user.name}`.length > 15 ? `${user.name}`.slice(0, 15) + '...' : `${user.name}`}
              </Text>
              <Text style={styles.sectionTitleText}>
                {user.username && user.username.length > 15 ? `${user.username.slice(0, 15)}...` : user.username}
              </Text>
            </View>
          )}
          renderBackground={() => (
            <View key="background">
              <Image source={helpers.setImageByDefault(user, 'photo_front')}
                style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }} />
              <View style={{
                position: 'absolute',
                top: 0,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: window.width,
                backgroundColor: 'rgba(0,0,0,.4)',
                height: PARALLAX_HEADER_HEIGHT
              }}>
              </View>
            </View>
          )}>
          <ScrollableTabView style={{ marginTop: -5 }}
            renderTabBar={() => <ScrollableTabBar underlineStyle={{ backgroundColor: colors.purple }} renderTab={this.renderTab} />}
            tabBarPosition={'top'}>
            <View style={styles.mainSection} tabLabel={'person'} key={'person'}>
              <Text style={styles.textTitleDescription}>Correo electrónico:</Text>
              <Text>{user.email}</Text>
              <Text style={styles.textTitleDescription}>DNI:</Text>
              <Text>{user.document}</Text>
              <Text style={styles.textTitleDescription}>Teléfono:</Text>
              <Text>{user.phone}</Text>
              <Text style={styles.textTitleDescription}>Sexo:</Text>
              <Text>{user.gender}</Text>
              <Text style={styles.textTitleDescription}>Fecha de Nacimiento:</Text>
              <Text>{user.birthday}</Text>
              <Text style={styles.textTitleDescription}>Acerca de mi:</Text>
              <Text>{user.about_me || '--'}</Text>
              <Text style={[styles.textTitleDescription]}>Perfiles:</Text>
              {this._renderProfiles(user)}
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }} tabLabel={'business-center'} key={'business-center'}>
              <Text >No hay historial de trabajo</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', marginTop: 50}} tabLabel={'comment'} key={'comment'}>
              <Text >No hay comentarios</Text>
            </View>
          </ScrollableTabView>
        </ParallaxScrollView>
      </View>
    );
  }
}
