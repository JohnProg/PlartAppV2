import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Animated, Dimensions, Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
// import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { AVATAR_SIZE, PARALLAX_HEADER_HEIGHT } from './../../../constants';
import * as actions from './../../../actions/meActions';
import styles from './styles';

// Components
import { ImageLoader } from '../../../components/Loader/';
import defaultImage from './../../../img/background.jpg';

// Utils
import Helpers from './../../../utils/Helpers';
import Colors from './../../../utils/Colors';

const window = Dimensions.get('window');

const contentWrapperStyle = {
  position: 'relative',
  width: window.width,
  height: 250,
  backgroundColor: '#222',
};

class ProfileScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingAvatar: true,
      uploadingCover: false,
    };
  }

  showImagePicker = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      this.requestCameraPermission();
    } else {
      this.imagePicker();
    }
  }

  alertErrorMsg = (errMessage) => {
    Alert.alert(
      'Error occurs',
      errMessage,
      [
        { text: 'OK', onPress: () => { } },
      ],
      { cancelable: false },
    );
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ],
        {
          title: 'Camera and External Storage Permission',
          message: 'Cool Photo App needs access to your camera so you can take awesome pictures.',
        },
      );
      const result = Object.keys(granted).filter(permission => (
        granted[permission] !== PermissionsAndroid.RESULTS.GRANTED
      ));
      if (!granted || result.length > 0) {
        this.alertErrorMsg('You cannot upload image');
        return;
      }
      this.imagePicker();
    } catch (err) {
      this.alertErrorMsg(err);
    }
  }

  imagePicker = () => {
    const options = Helpers.getDefaultImagePicker;
    options.title = 'Seleccionar foto';

    ImagePicker.showImagePicker(options, async (response) => {
      const { dispatch } = this.props;
      if (!response.didCancel && !response.error) {
        this.setState({ isLoading: true, uploadingCover: true });
        dispatch(actions.setCurrentCoverProfile(`data:${response.type};base64,${response.data}`));
        await dispatch(actions.updateCoverProfile({ photo_front: `data:${response.type};base64,${response.data}` }));
        this.setState({ isLoading: false, uploadingCover: false });
      }
    });
  }

  updateLoadingAvatar = () => {
    this.setState({ isLoadingAvatar: false });
  }

  renderButtonProfile() {
    const { isLoadingAvatar, isLoading, uploadingCover } = this.state;
    if (!isLoadingAvatar && !isLoading && !uploadingCover) {
      return (
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => alert('go to edit profile')}
        >
          <Text>Editar</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderButtonCamara() {
    if (!this.state.isLoading && !this.state.uploadingCover) {
      return (
        <TouchableOpacity
          style={styles.btnCamera}
          onPress={this.showImagePicker}
        >
          <Icon name="photo-camera" size={35} color="white" />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderProfiles = () => {
    const { currentUser } = this.props;
    if (currentUser && currentUser.profiles) {
      return (
        currentUser.profiles.map(feature => (
          <Text key={feature.name} style={styles.profileText}>{feature.name}: {feature.value || '--'}</Text>
        ))
      );
    }
    return <Text>No tiene perfiles.</Text>;
  }

  // renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => (
  //   <TouchableOpacity
  //     key={`${name}_${page}`}
  //     onPress={() => onPressHandler(page)}
  //     onLayout={onLayoutHandler}
  //     style={styles.btnTab}
  //     underlayColor="#aaaaaa"
  //   >
  //     <Icon name={name} size={25} color={isTabActive ? '#000' : 'gray'} />
  //   </TouchableOpacity>
  // );
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

  render() {
    const { currentUser } = this.props;
    const fullName = `${currentUser.first_name} ${currentUser.last_name}`;
    return (
      <ParallaxScroll
        style={{backgroundColor: 'transparent'}}
        parallaxHeight={250}
        renderParallaxForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            {this.renderButtonProfile()}
            {this.renderButtonCamara()}
            {
              !this.state.uploadingCover ?
                <ImageLoader
                  source={currentUser.photo ? { uri: currentUser.photo.replace('http', 'https') } : defaultImage}
                  indicatorStyle={{ flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)', borderRadius: AVATAR_SIZE / 2 }}
                  style={[styles.avatar, { width: AVATAR_SIZE, height: AVATAR_SIZE }]}
                  imageLoaded={this.updateLoadingAvatar}
                /> : null
            }
            {
              this.state.uploadingCover ? null : (
                <Text style={styles.sectionSpeakerText}>
                  {fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName}
                </Text>
              )
            }
            {
              this.state.uploadingCover ? null : (
                <Text style={styles.sectionTitleText}>
                  {currentUser.username && currentUser.username.length > 15 ? `${currentUser.username.slice(0, 15)}...` : currentUser.username}
                </Text>
              )
            }
          </View>
        )}
        renderParallaxBackground={() => (
          <View key="background">
            <Image
              source={currentUser.photo_front ? { uri: currentUser.photo_front.replace('http', 'https') } : defaultImage}
              style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }}
            />
            <View style={[styles.coverView, { backgroundColor: this.state.uploadingCover ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.4)' }]}>
              {
                !this.state.uploadingCover ? null : (
                  <Text style={styles.uploadingCoverText}>Subiendo foto de portada...</Text>
                )
              }
            </View>
          </View>
        )}
        parallaxBackgroundScrollSpeed={5}
        parallaxForegroundScrollSpeed={2.5}
      >
        <ScrollableTabView style={{backgroundColor: 'white'}}
          renderTabBar={() => <ScrollableTabBar underlineStyle={{backgroundColor: Colors.purple}} renderTab={this.renderTab}/>}
          tabBarPosition={'top'}>
          <View style={styles.mainSection} tabLabel={'person'} key={'person'}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.textTitleDescription}>Correo electrónico: </Text>
                <Text>{currentUser.email}</Text>
              </View>
              <View style={{marginRight: 60, marginBottom: 20}}>
                <Text style={styles.textTitleDescription}>DNI:</Text>
                <Text>{currentUser.document}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.textTitleDescription}>Teléfono:</Text>
                <Text>{currentUser.phone}</Text>
              </View>
              <View style={{marginRight: 60, marginBottom: 20}}>
                <Text style={styles.textTitleDescription}>Sexo:</Text>
                <Text>{currentUser.gender}</Text>
              </View>
            </View>
            <Text style={styles.textTitleDescription}>Fecha de Nacimiento:</Text>
            <Text>{currentUser.birthday}</Text>
            <Text style={[styles.textTitleDescription, {marginTop: 20}]}>Perfiles:</Text>
            {this.renderProfiles()}
          </View>
          <View style={{flex: 1, alignItems: 'center', marginTop: 50}} tabLabel={'business-center'} key={'business-center'}>
              <Text >No hay historial de trabajo</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', marginTop: 50}} tabLabel={'comment'} key={'comment'}>
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
};

export default connect(({ app, me }) => ({
  hasInternet: app.hasInternet,
  currentUser: me.currentUser,
  isFetching: me.isFetching,
  errors: me.errors,
}))(ProfileScreen);
