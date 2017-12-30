'use strict';

import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, ListView, Modal, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      isLoadingAvatar: true,
      showModal: false,
      uploadingCover: false,
      user: props.getCurrentUser()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({user: nextProps.getCurrentUser()});
  }

  _renderProfiles(user) {
    if (user["profiles"]) {
      return user.profiles.map((feature, i) => <Text key={i} style={{marginBottom: 5}}>{feature.name}: {feature.value || '--'}</Text>)
    }
  }

  updateCoverPhoto() {
    ImagePicker.showImagePicker(helpers.getDefaultImagePicker, (response) => {
      let user = this.state.user,
          photo_front = `data:image/jpeg;base64,${response.data}`;

      if (!response.didCancel && !response.error) {
        this.setState({isLoading: true, uploadingCover: true});
        api.updatePersonalCoverPhoto({token: this.state.user.token, photo_front: photo_front})
          .then((userData) => {
            user.photo_front = photo_front;
            this.setState({user: user, isLoading: false, uploadingCover: false});
            this.props.setCurrentUser(this.state.user);
          })
          .catch((errorObj) => {
            this.setState({isLoading: false, uploadingCover: false});
          });
      }
    });
  }

  _renderButtonProfile() {
    const { isLoadingAvatar, isLoading, uploadingCover } = this.state;
    if(!isLoadingAvatar && !isLoading && !uploadingCover) {
      return (
        <TouchableOpacity
          style={{position: 'absolute', top: 40, right: 30, backgroundColor: '#fff', padding: 7, borderRadius: 5}}
          onPress={() => this.setState({showModal: true})}>
            <Text>Editar</Text>
        </TouchableOpacity>
      )
    }
    return null;
  }

  _renderButtonCamara() {
    if(!this.state.isLoading && !this.state.uploadingCover) {
      return <TouchableOpacity style={{position: 'absolute', top: 40, left: 30}} onPress={this.updateCoverPhoto.bind(this)}>
          <Icon name='photo-camera' size={35} color="white" style={{backgroundColor: 'transparent'}}/>
      </TouchableOpacity>
    }
    return null;
  }

  updateLoadingAvatar() {
    this.setState({isLoadingAvatar: false});
  }

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
   return <TouchableOpacity
     key={`${name}_${page}`}
     onPress={() => onPressHandler(page)}
     onLayout={onLayoutHandler}
     style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
     underlayColor="#aaaaaa">
      <Icon name={name} size={25} color={ isTabActive ? '#000' : 'gray'} style={{backgroundColor: 'transparent'}}/>
   </TouchableOpacity>;
  }
  // <Image
  //   onLoadStart={this.handleLoadStart}
  //   onProgress={this.handleProgress}
  //   onError={this.handleError}
  //   onLoad={this.handleLoad}
  //   source={{uri: 'http://demos.jquerymobile.com/1.4.5/_assets/img/newyork.jpg', width: 400, height: 400}} >
  //     {imgLoader ? <Text> holaaa</Text> : <Text> listo</Text>}
  //   </Image>

  render() {
    let user = this.state.user;
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showModal}
            onRequestClose={() => {}}>
            <EditProfilePage
              user={Object.assign({}, this.state.user)}
              navigator={this.props.navigator}
              setCurrentUser={this.props.setCurrentUser}
              onPress={() => this.setState({showModal: false})} />
        </Modal>

        <ParallaxScrollView
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          renderForeground={() => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
              { this._renderButtonProfile() }
              { this._renderButtonCamara() }
                {
                  !this.state.uploadingCover ?
                  <ImageLoader
                    source={helpers.setImageByDefault(user, 'photo')}
                    indicatorStyle={{flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)', borderRadius: AVATAR_SIZE / 2}}
                    style={[styles.avatar, {width: AVATAR_SIZE, height: AVATAR_SIZE}]}
                    imageLoaded={this.updateLoadingAvatar.bind(this)} /> : null
                }
              {
                !this.state.uploadingCover ? <Text style={ styles.sectionSpeakerText }>
                  {`${user.first_name} ${user.last_name}`.length > 15 ? `${user.first_name} ${user.last_name}`.slice(0, 15) + '...' : `${user.first_name} ${user.last_name}`}
                </Text> : null
              }
              {
                !this.state.uploadingCover ? <Text style={ styles.sectionTitleText }>
                  {user.username && user.username.length > 15 ? `${user.username.slice(0, 15)}...` : user.username}
                </Text> : null
              }
            </View>
          )}
          renderBackground={() => (
            <View key="background">
              <Image source={helpers.setImageByDefault(user, 'photo_front')}
                    style={{width: window.width, height: PARALLAX_HEADER_HEIGHT}}/>
              <View style={{position: 'absolute',
                            top: 0,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: window.width,
                            backgroundColor: this.state.uploadingCover ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.4)',
                            height: PARALLAX_HEADER_HEIGHT}}>
                            {
                              this.state.uploadingCover ? <Text style={{color: 'white', fontSize: 20}}>Subiendo foto de portada...</Text> : null
                            }
              </View>
            </View>
          )}>
          <ScrollableTabView style={{marginTop: -5}}
              renderTabBar={() => <ScrollableTabBar underlineStyle={{backgroundColor: colors.purple}} renderTab={this.renderTab}/>}
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
              <View style={{flex: 1, alignItems: 'center', marginTop: 50}} tabLabel={'business-center'} key={'business-center'}>
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
