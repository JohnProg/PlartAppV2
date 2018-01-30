import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Text, Picker, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
// Components
import Button from './../../../components/Button';
import PickerModal from './../../../components/PickerModal';
import DatePickerDialog from './../../../components/DatePickerDialog';
import { OverlayLoader, ImageLoader } from './../../../components/Loader';
import showImagePicker from './../../../components/ImagePicker';
import defaultImage from './../../../img/background.jpg';
import { genderOptions } from './../../../constants';

import * as actions from './../../../actions/meActions';

// Utils
import Helpers from './../../../utils/Helpers';

import styles from './styles';

class EditProfileScreen extends Component {
  static navigatorStyle = {
    drawUnderTabBar: true,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'cancel',
        title: 'Cancelar',
        systemItem: 'cancel',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = { ...this.props.currentUser };
    this.inputs = {};
    this.multiline = true;
    this.enablesReturnKeyAutomatically = true;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'cancel':
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
        break;
      default:
        break;
    }
  }

  onChange = (text, key) => (this.setState({ [key]: text }));

  onFocusNextField(key) {
    this.inputs[key].focus();
  }

  onShowImagePicker = () => {
    const options = Helpers.getDefaultImagePicker;
    options.title = 'Cambiar foto del perfil';

    showImagePicker(options, async (response) => {
      const { dispatch } = this.props;
      if (!response.didCancel && !response.error) {
        if (!this.props.hasInternet) {
          Alert.alert('Necesitas internet subir esta imágen.');
          return;
        }
        await dispatch(actions.updateAvatarProfile({ profile_picture: `data:${response.type};base64,${response.data}` }));
        dispatch(actions.setCurrentAvatarProfile(`data:${response.type};base64,${response.data}`));
        setTimeout(() => {
          this.props.navigator.dismissModal({
            animationType: 'slide-down',
          });
          this.props.navigator.showInAppNotification({
            screen: 'plartApp.Notification',
            passProps: {
              body: 'Tu foto del perfil se cambió.',
            },
            autoDismissTimerSec: 5,
          });
        }, 100);
      }
    });
  }

  handleSubmit = async () => {
    const { dispatch, hasInternet } = this.props;
    const {
      first_name, last_name, email, document, phone, gender, birthday, avatar, about_me,
    } = this.state;
    const data = {
      first_name,
      last_name,
      document,
      email,
      phone,
      gender,
      birthday,
      about_me,
    };

    if (!hasInternet) {
      Alert.alert('Aviso', 'Necesitas internet para editar tu perfil.');
      return;
    }

    if (data.gender) {
      data.gender = data.gender.value === 'male' ? 1 : 2;
    }
    if (data.birthday) {
      data.birthday = Moment(data.birthday).format(Helpers.getFormats.date);
    }
    if (avatar && avatar.uri) {
      data.photo = avatar.uri;
    }

    try {
      await dispatch(actions.updateProfile(data));
      data.gender = gender;
      if (avatar && avatar.uri) {
        data.photo = avatar.uri;
      }
      await dispatch(actions.setCurrentUser(data));
      setTimeout(() => {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }, 100);
    } catch (_) {
      const { errors } = this.props;
      Alert.alert('Error', Helpers.formatError(errors));
    }
  }

  openDatePicker = () => {
    this.inputs.birthday.open({
      date: new Date(this.state.birthday),
      minimumDate: new Date('1/1/1900'),
      maximumDate: new Date('12/31/1999'),
    });
  }

  openGenderPicker = () => {
    this.inputs.gender.open({
      value: this.state.gender.value,
      items: genderOptions,
    });
  };

  render() {
    const { currentUser, isFetching, isUploadingAvatar } = this.props;
    const { birthday, gender } = this.state;
    const birthdayText = Moment(birthday).format(Helpers.getFormats.dateHuman);
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContainerStyle}
        keyboardShouldPersistTaps="always"
      >
        <OverlayLoader visible={isFetching || isUploadingAvatar} />
        <View style={styles.avatarContainerStyle}>
          <TouchableOpacity
            onPress={() => this.onShowImagePicker()}
          >
            <ImageLoader
              source={currentUser.photo ? { uri: currentUser.photo.replace('http', 'https') } : defaultImage}
              indicatorStyle={styles.indicatorStyle}
              style={styles.avatarImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onShowImagePicker()}>
            <Text style={styles.changeAvatarTextStyle}>Cambiar foto del perfil</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Nombres*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              maxLength={250}
              onChangeText={text => this.onChange(text, 'first_name')}
              onSubmitEditing={() => this.onFocusNextField('last_name')}
              ref={input => this.inputs.first_name = input}
              returnKeyType="next"
              defaultValue={currentUser.first_name}
              value={this.state.first_name}
            />
          </View>
          <Text>Apellido*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              onChangeText={text => this.onChange(text, 'last_name')}
              onSubmitEditing={() => this.onFocusNextField('email')}
              ref={input => this.inputs.last_name = input}
              defaultValue={currentUser.last_name}
              returnKeyType="next"
            />
          </View>
          <Text>Email*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              onChangeText={text => this.onChange(text, 'email')}
              onSubmitEditing={() => this.onFocusNextField('document')}
              ref={input => this.inputs.email = input}
              defaultValue={currentUser.email}
              returnKeyType="next"
            />
          </View>
          <Text>DNI*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="always"
              underlineColorAndroid="transparent"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              keyboardType="numeric"
              maxLength={8}
              onChangeText={text => this.onChange(text, 'document')}
              onSubmitEditing={() => this.onFocusNextField('phone')}
              placeholder="DNI"
              ref={input => this.inputs.document = input}
              defaultValue={currentUser.document}
              returnKeyType="next"
            />
          </View>
          <Text>Teléfono/Celular*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="always"
              underlineColorAndroid="transparent"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              keyboardType="phone-pad"
              maxLength={15}
              onChangeText={text => this.onChange(text, 'phone')}
              onSubmitEditing={() => this.onFocusNextField('about_me')}
              placeholder="Teléfono"
              defaultValue={currentUser.phone}
              ref={input => this.inputs.phone = input}
              returnKeyType="next"
            />
          </View>
          <Text>Género*</Text>
          <TouchableOpacity
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openGenderPicker()}
          >
            <Text style={[styles.textField, styles.textButtonPickerStyle]}>{gender.label}</Text>
          </TouchableOpacity>
          <PickerModal
            ref={input => this.inputs.gender = input}
            onValuePicked={value => this.onChange(value, 'gender')}
          >
            <Picker.Item label="Masculino" value="male" />
            <Picker.Item label="Femenino" value="female" />
          </PickerModal>
          <Text>Fecha de Nacimiento*</Text>
          <TouchableOpacity
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openDatePicker()}
          >
            <Text style={[styles.textField, styles.textButtonPickerStyle]}>{birthdayText}</Text>
          </TouchableOpacity>
          <DatePickerDialog
            ref={input => this.inputs.birthday = input}
            onDatePicked={date => this.onChange(date, 'birthday')}
          />
          <Text style={styles.textWhite}>Acerca de mí*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={[styles.textField, styles.descriptionTextField]}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              maxLength={250}
              onChangeText={text => this.onChange(text, 'about_me')}
              defaultValue={currentUser.about_me}
              ref={input => this.inputs.about_me = input}
              multiline={this.multiline}
            />
          </View>
          <Button type={2} onPress={() => this.handleSubmit()}>Guardar Cambios</Button>
        </View>
      </ScrollView>
    );
  }
}

EditProfileScreen.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUploadingAvatar: PropTypes.bool.isRequired,
  hasInternet: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
    showInAppNotification: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({ app, me }) => ({
  hasInternet: app.hasInternet,
  currentUser: me.currentUser,
  errors: me.errors,
  isFetching: me.isFetching,
  isUploadingAvatar: me.isUploadingAvatar,
}))(EditProfileScreen);
