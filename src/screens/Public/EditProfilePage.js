'use strict';

import React, { Component } from 'react';
import { Alert, BackAndroid, Image, Text, StatusBar, Platform, Modal, ScrollView, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form, Separator, InputField, PickerField, DatePickerField, LinkField, SwitchField } from 'react-native-form-generator';

// Components
import Header from './../../Components/Header';
import { OverlayLoader } from '../../Components/Loader';

// Pages
import TermsAndConditions from './TermsAndConditionsPage';

// Utils
import api from '../../Utils/api';
import helpers from './../../Utils/helpers';

import styles from '../../Styles/profile.style.js';


export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploadingPhoto: false,
      newProfileImage: false,
      user: props.user,
      isLoading: false,
      formWasModified: false,
      saveFormReady: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  componentDidMount() {
    StatusBar.setHidden(false);
  }

  handleFormChange(formData) {
    Object.keys(formData).forEach((key) => {
      let user = this.state.user,
        profiles = this.state.user.profiles;

      if (key.indexOf('profile') > -1) {
        profiles.map((profile) => {
          let newKey = key.replace('_profile', '')
          if (profile.slug === newKey) {
            profile.value = formData[key]
          }
        })
        user.profiles = profiles;
      } else {
        user[key] = formData[key];
      }

      this.setState({ user: user, formWasModified: true });
    });
  }

  _renderFeatures(user) {
    if (user["profiles"]) {
      return user.profiles.map((feature, i) =>
        <InputField key={i}
          ref={`${feature.slug}_profile`}
          value={feature.value}
          placeholder={feature.name} />)
    }
  }

  updateProfile() {
    let data = Object.assign({}, this.state.user);

    data.gender = data.gender === 'Masculino' ? 1 : 2;
    data.birthday = Moment(data.birthday).format('YYYY-MM-DD');
    data.token = this.state.user.token;
    if (data.about_me == null) delete data.about_me;
    data.profiles = this.state.user.profiles.map((profile) => {
      let objProfile = {};

      objProfile[profile.slug] = profile.value || '';
      return objProfile;
    })
    this.setState({ isLoading: true });
    if (this.state.newProfileImage) {
      this.setState({ isUploadingPhoto: true });
      api.updatePersonalAvatar({ token: data.token, profile_picture: data.photo })
        .then((userData) => {
          let user = this.state.user;

          user.photo = userData.photo;
          this.props.setCurrentUser(user);

          this.setState({ isUploadingPhoto: false });

          if (this.state.saveFormReady) {
            this.setState({ isLoading: false });
            this.props.onPress();
          }
        })
        .catch((errorObj) => {
          if (!this.state.isLoading) {
            this.setState({ isLoading: false, isUploadingPhoto: false });
            this.props.onPress();
          }
        });
    }
    delete data.photo_front;
    delete data.photo;
    delete data.profiles;
    api.updatePersonalInfo(data)
      .then((authData) => {
        this.props.setCurrentUser(this.state.user);
        this.setState({ saveFormReady: true });
        if (!this.state.isUploadingPhoto) {
          this.setState({ isLoading: false });
          this.props.onPress();
        }
      })
      .catch((errorObj) => {
        let keys = '';

        this.setState({ isLoading: false });
        for (let key in errorObj) {
          if (errorObj.hasOwnProperty(key)) {
            let errors = errorObj[key];
            for (let error in errors) {
              if (errors.hasOwnProperty(error)) {
                keys += (key + ": " + errors[error] + "\n");
              }
            }
          }
        }
        setTimeout(() => {
          Alert.alert('Error', keys);
        }, 100);
      });
  }

  updateAvatar = () => {
    let options = helpers.getDefaultImagePicker;
    options['title'] = 'Cambiar foto del perfil';
    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        let user = this.state.user,
          profile_picture = `data:image/jpeg;base64,${response.data}`;

        user.photo = profile_picture;
        this.setState({ user: user, newProfileImage: true });
      }
    });
  }

  focusNextField = (nextField) => {
    this.refs.registrationForm.refs[nextField].focus();
  }

  render() {
    let { user, formWasModified, newProfileImage } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
        <OverlayLoader visible={this.state.isLoading} />
        <Header
          title="Editar Perfil"
          leftText="Cancelar"
          showStatusBar={Platform.OS === 'ios'}
          onLeftPress={() => {
            if (formWasModified || newProfileImage) {
              Alert.alert(
                'Cambios sin guardar',
                'No guardaste los cambios. ¿Estás seguro de que deseas cancelar?',
                [
                  {
                    text: 'Cancelar'
                  },
                  {
                    text: 'Si',
                    onPress: () => this.props.onPress()
                  },
                ]
              );
            } else {
              this.props.onPress();
            }
          }}
          rightText="Listo"
          onRightPress={this.updateProfile.bind(this)} />
        <KeyboardAwareScrollView
          ref='scroll'
          keyboardShouldPersistTaps='always' >
          <View style={[styles.headerContent, { paddingVertical: 20 }]}>
            <TouchableOpacity
              onPress={() => this.updateAvatar()}
              style={{ borderRadius: 60 }}>
              <Image
                source={helpers.setImageByDefault(user, 'photo')}
                indicatorStyle={{ flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)', borderRadius: 60 }}
                style={[styles.avatar, { width: 120, height: 120 }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.updateAvatar()}>
              <Text style={[styles.userFirstNameLastName, { paddingTop: 10 }]}>Cambiar foto del perfil</Text>
            </TouchableOpacity>
          </View>
          <Form ref='registrationForm'
            onChange={this.handleFormChange.bind(this)}
            style={Platform.OS === 'android' ? styles.container : {}}>
            <InputField
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode='always'
              enablesReturnKeyAutomatically={true}
              maxLength={250}
              onSubmitEditing={() => this.focusNextField('last_name')}
              placeholder={'Nombres'}
              ref='first_name'
              returnKeyType={'next'}
              value={user.first_name}
            />
            <InputField
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode='always'
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => this.focusNextField('email')}
              placeholder={'Apellidos'}
              ref='last_name'
              returnKeyType={'next'}
              value={user.last_name}
            />
            <InputField
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode='always'
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => this.focusNextField('document')}
              placeholder={'Correo electrónico'}
              ref='email'
              returnKeyType={'next'}
              value={user.email}
            />
            <InputField
              autoCorrect={false}
              clearButtonMode='always'
              enablesReturnKeyAutomatically={true}
              keyboardType='numeric'
              maxLength={8}
              onSubmitEditing={() => this.focusNextField('phone')}
              placeholder={'DNI'}
              ref='document'
              returnKeyType={'next'}
              value={user.document}
            />
            <InputField
              autoCorrect={false}
              clearButtonMode='always'
              enablesReturnKeyAutomatically={true}
              keyboardType='phone-pad'
              maxLength={15}
              placeholder={'Teléfono'}
              ref='phone'
              returnKeyType={'next'}
              value={user.phone}
            />
            <PickerField
              ref='gender'
              containerStyle={[{ flexDirection: 'row', flex: 0.5, marginLeft: Platform.OS === 'android' ? 5 : 0 }]}
              label='Gender'
              value={user.gender === 'Masculino' ? 'Masculino' : 'Femenino'}
              placeholder="Gender"
              prettyPrint={true}
              pickerWrapper={<CustomModal />}
              options={{ Masculino: 'Masculino', Femenino: 'Femenino' }}
              labelStyle={[{ fontSize: 17, flex: 0.7, paddingTop: Platform.OS === 'android' ? 10 : 5 }]}
            />

            <DatePickerField
              ref='birthday'
              maximumDate={new Date()}
              placeholder='F. Nacimiento'
              mode='date'
              prettyPrint={true}
              pickerWrapper={<CustomModal />}
              date={new Date(Moment(user.birthday))}
              value={user.birthday} />
            {Platform.OS === 'android' ? null : <Separator containerStyle={{ backgroundColor: '#ecf0f1', paddingTop: 15, padding: 10 }} label='INFORMACIón de perfil' />}
            {this._renderFeatures(user)}
            <InputField
              multiline={true}
              value={user.about_me}
              ref='about_me'
              placeholder=' Acerca de mí'
            />
          </Form>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const CustomModal = ({ children, onHidePicker }) =>
  <Modal transparent={true}>
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(43, 48, 62, 0.57)' }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8
        }}>
        {children}
        <TouchableOpacity style={{ alignItems: 'center' }}
          onPress={() => onHidePicker()}>
          <Text style={{ fontSize: 19, paddingBottom: 15 }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
