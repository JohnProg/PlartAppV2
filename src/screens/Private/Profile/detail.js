import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { PARALLAX_HEADER_HEIGHT } from './../../../constants';
import * as actions from './../../../actions/meActions';
import styles from './styles';

// Components
import { ImageLoader } from './../../../components/Loader/';
import showImagePicker from './../../../components/ImagePicker';
import defaultImage from './../../../img/background.jpg';

// Utils
import Helpers from './../../../utils/Helpers';

const window = Dimensions.get('window');

class ProfileScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  onShowImagePicker = () => {
    const options = Helpers.getDefaultImagePicker;
    options.title = 'Seleccionar foto';

    showImagePicker(options, async (response) => {
      const { dispatch } = this.props;
      if (!response.didCancel && !response.error) {
        if (!this.props.hasInternet) {
          Alert.alert('Necesitas internet subir esta imágen.');
          return;
        }
        await dispatch(actions.updateCoverProfile({ photo_front: `data:${response.type};base64,${response.data}` }));
        dispatch(actions.setCurrentCoverProfile(`data:${response.type};base64,${response.data}`));
        this.props.navigator.showInAppNotification({
          screen: 'plartApp.Notification',
          passProps: {
            body: 'Tu cover del perfil se cambió.',
          },
          autoDismissTimerSec: 5,
        });
      }
    });
  }

  renderButtonProfile = () => (
    <TouchableOpacity
      style={styles.btnEdit}
      onPress={() => (
        this.props.navigator.showModal({
          title: 'Editar Perfil',
          screen: 'plartApp.EditProfile',
          animated: true,
          animationType: 'slide-up',
        })
      )}
    >
      <Text>Editar</Text>
    </TouchableOpacity>
  )

  renderButtonCamera = () => (
    <TouchableOpacity
      style={styles.btnCamera}
      onPress={this.onShowImagePicker}
    >
      <Icon name="photo-camera" size={35} color="white" />
    </TouchableOpacity>
  )

  renderUserInfo = (currentUser, fullName) => (
    <View style={styles.userInfoStyle}>
      <ImageLoader
        source={currentUser.photo ? { uri: currentUser.photo.replace('http', 'https') } : defaultImage}
        style={styles.avatarImageStyle}
        indicatorStyle={styles.indicatorStyle}
      />
      <Text style={styles.fullNameStyle}>
        {fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName}
      </Text>
      <Text style={styles.usernameStyle}>
        {currentUser.username && currentUser.username.length > 15 ? `${currentUser.username.slice(0, 15)}...` : currentUser.username}
      </Text>
    </View>
  )

  renderProfiles = () => {
    const { currentUser } = this.props;
    if (currentUser && currentUser.profiles) {
      return (
        currentUser.profiles.map(profile => (
          <Text key={profile.name} style={styles.profileText}>{profile.name}: {profile.value || '--'}</Text>
        ))
      );
    }
    return <Text>No tiene perfiles.</Text>;
  }

  renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => (
    <TouchableOpacity
      key={`${name}_${page}`}
      onPress={() => onPressHandler(page)}
      onLayout={onLayoutHandler}
      style={styles.btnTab}
      underlayColor="#aaaaaa"
    >
      <Icon name={name} size={25} color={isTabActive ? '#000' : 'gray'} />
    </TouchableOpacity>
  );

  render() {
    const { currentUser, isFetching, isUploadingCover } = this.props;
    const fullName = `${currentUser.first_name} ${currentUser.last_name}`;
    return (
      <ParallaxScroll
        style={styles.parallaxScrollStyle}
        parallaxHeight={250}
        renderParallaxForeground={() => (
          <View style={styles.parallaxHeaderStyle}>
            {(!isFetching && !isUploadingCover) && this.renderButtonProfile()}
            {(!isFetching && !isUploadingCover) && this.renderButtonCamera()}
            {!isUploadingCover && this.renderUserInfo(currentUser, fullName)}
          </View>
        )}
        renderParallaxBackground={() => (
          <View>
            <Image
              source={currentUser.photo_front ? { uri: currentUser.photo_front.replace('http', 'https') } : defaultImage}
              style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }}
            />
            <View style={[styles.coverView, { backgroundColor: isUploadingCover ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.4)' }]}>
              {
                !isUploadingCover ? null : (
                  <Text style={styles.uploadingCoverText}>Subiendo foto de portada...</Text>
                )
              }
            </View>
          </View>
        )}
        parallaxBackgroundScrollSpeed={5}
        parallaxForegroundScrollSpeed={2.5}
      >
        <ScrollableTabView
          style={styles.scrollableTabViewStyle}
          renderTabBar={() => (
            <ScrollableTabBar
              activeTab={0}
              underlineStyle={styles.underlineStyle}
              renderTab={this.renderTab}
            />
          )}
        >
          <View style={styles.mainSection} tabLabel="person" key="person">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.textTitleDescription}>Correo electrónico: </Text>
                <Text>{currentUser.email}</Text>
              </View>
              <View style={{ marginRight: 60, marginBottom: 20 }}>
                <Text style={styles.textTitleDescription}>DNI:</Text>
                <Text>{currentUser.document}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.textTitleDescription}>Teléfono:</Text>
                <Text>{currentUser.phone}</Text>
              </View>
              <View style={{ marginRight: 60, marginBottom: 20 }}>
                <Text style={styles.textTitleDescription}>Sexo:</Text>
                <Text>{currentUser.gender && currentUser.gender.label}</Text>
              </View>
            </View>
            <Text style={styles.textTitleDescription}>Fecha de Nacimiento:</Text>
            <Text>{currentUser.birthday}</Text>
            <Text style={[styles.textTitleDescription, { marginTop: 20 }]}>Perfiles:</Text>
            {this.renderProfiles()}
          </View>
          <View style={styles.emptyTabContentStyle} tabLabel="business-center" key="business-center">
            <Text >No hay historial de trabajo</Text>
          </View>
          <View style={styles.emptyTabContentStyle} tabLabel="comment" key="comment">
            <Text >No hay comentarios</Text>
          </View>
        </ScrollableTabView>
      </ParallaxScroll>
    );
  }
}

ProfileScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUploadingCover: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    showModal: PropTypes.func.isRequired,
    showInAppNotification: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({ app, me }) => ({
  hasInternet: app.hasInternet,
  currentUser: me.currentUser,
  isFetching: me.isFetching,
  isUploadingCover: me.isUploadingCover,
  errors: me.errors,
}))(ProfileScreen);
