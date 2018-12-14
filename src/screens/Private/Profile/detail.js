import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { List, ListItem as Item } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Timeline from './../../../components/TimeLine';
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
  state = {
    height: 0,
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

  handleTabHeight = (obj) => {
    // (this.bodys[obj.ref.props.tabLabel]._root || this.bodys[obj.ref.props.tabLabel]).measure((x, y, w, h) => {
    //   if (h !== 0) {
    //     this.setState({ height: h });
    //   }
    // });
  }

  bodys = {}

  data = [
    { id: 1, time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688', lineColor: '#009688' },
    { id: 2, time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.' },
    { id: 3, time: '12:00', title: 'Lunch' },
    { id: 4, time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ', lineColor: '#009688' },
    { id: 5, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 6, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 7, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 8, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 9, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 10, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 11, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 12, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
    { id: 13, time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688' },
  ]

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

  renderBasicInfo = currentUser => (
    <View
      ref={e => this.bodys.Perfil = e}
      onLayout={({ nativeEvent: { layout: { height } } }) => {
        this.setState({ height });
      }}
    >
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
  )

  renderExperienceListWork = () => (
    <Timeline
      style={styles.timeLineListContainerStyle}
      data={this.data}
      circleSize={20}
      passRef={e => this.bodys.Experiencia = e}
      updateHeight={height => this.setState({ height })}
      scrollEnabled={false}
      circleColor="rgb(45,156,219)"
      lineColor="rgb(45,156,219)"
      timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
      timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
      descriptionStyle={{ color: 'gray' }}
      options={{
        style: { paddingTop: 5 },
      }}
    />
  )

  renderComments = () => (
    <List
      ref={e => this.bodys.Comentarios = e}
      onLayout={({ nativeEvent: { layout: { height } } }) => {
        this.setState({ height });
      }}
    >
      {new Array(40).fill(null).map((_, i) => <Item key={i}><Text>No hay historial de trabajo {i}</Text></Item>)}
    </List>
  )

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
            <View style={[
              styles.coverView,
              { backgroundColor: isUploadingCover ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.4)' }
            ]}>
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
          style={[
            styles.scrollableTabViewStyle,
            // { height: this.state.height },
          ]}
          onChangeTab={obj => this.handleTabHeight(obj)}
        >
          <View style={styles.mainSection} tabLabel="Perfil" key="person">
            {this.renderBasicInfo(currentUser)}
          </View>
          <View style={styles.emptyTabContentStyle} tabLabel="Experiencia" key="business-center">
            {this.renderExperienceListWork()}
          </View>
          <View style={styles.emptyTabContentStyle} tabLabel="Comentarios" key="comment">
            {this.renderComments()}
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
