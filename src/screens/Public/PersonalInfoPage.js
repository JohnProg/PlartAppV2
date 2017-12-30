'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form, InputField, PickerField, DatePickerField } from 'react-native-form-generator';
import ImagePicker from 'react-native-image-picker';

// Components
import Button from './../../Components/Button';
import { OverlayLoader } from './../../Components/Loader';
import { KeyboardAwareScrollView } from './../../Components/KeyboardAwareScrollView';
import Header from './../../Components/Header';

// Pages
import Dashboard from '../Dashboard';

// Utils
import api from './../../Utils/api';
import helpers from './../../Utils/helpers';
import styles from './../../Styles/personalInfo.style'

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      formData: {},
      token: props.token,
      avatar: {}
    };
    this.format = helpers.getFormats['date'];
  }

  componentDidMount() {
    if (!this.state.token) {
      AsyncStorage.getItem('user')
        .then(user_data_json => this.setState({ token: JSON.parse(user_data_json)['token'] }));
    }
  }

  handleSubmit = () => {
    this.setState({ isLoading: true });
    let data = this.state.formData;

    if (data.gender) {
      data.gender = data.gender === 'male' ? 1 : 2;
    }
    if (data.birthday) data.birthday = Moment(data.birthday).format(this.format);
    if (this.state.avatar.avatar_url) data.profile_picture = this.state.avatar.avatar_url;
    if (this.state.token) data.token = this.state.token;
    api.postSavePersonalInfo(data)
      .then((authData) => {
        this.setState({ isLoading: false });
        this.props.navigator.resetTo({ component: Dashboard });
      })
      .catch((errorObj) => {
        this.setState({ isLoading: false });
        let errorMessage = helpers.formatError(errorObj);

        setTimeout(() => {
          Alert.alert('Error', errorMessage);
        }, 100);
      });
  }

  focusNextField = (nextField) => {
    this.refs.registrationForm.refs[nextField].focus();
  }

  capturePhoto = () => {
    let options = helpers.getDefaultImagePicker;
    options['title'] = 'Seleccionar foto';

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        let avatar = this.state.avatar;
        avatar.avatar_url = `data:image/jpeg;base64,${response.data}`;
        this.setState({ avatar: avatar });
      }
    });
  }

  handleFormChange(formData) {
    this.setState({ formData: formData })
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}>
        <OverlayLoader visible={this.state.isLoading} />
        <View style={{ alignItems: 'center', marginBottom: 20, paddingTop: 60 }}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.avatarButton}
            onPress={() => this.capturePhoto()}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={helpers.setImageByDefault(this.state.avatar, 'avatar_url')}
                style={styles.avatar} />
              <Text style={styles.textEditAvatar}>Editar</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Form ref="registrationForm"
          onChange={this.handleFormChange.bind(this)}
          style={{ paddingBottom: 30 }}>
          <InputField
            autoCapitalize="words"
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={true}
            maxLength={250}
            onSubmitEditing={() => this.focusNextField('last_name')}
            placeholder="Nombres"
            ref="first_name"
            returnKeyType="next"
          />
          <InputField
            autoCapitalize="words"
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() => this.focusNextField('document')}
            placeholder="Apellidos"
            ref="last_name"
            returnKeyType="next"
          />
          <InputField
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={true}
            keyboardType='numeric'
            maxLength={8}
            onSubmitEditing={() => this.focusNextField('phone')}
            placeholder="DNI"
            ref="document"
            returnKeyType="next"
          />
          <InputField
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={true}
            keyboardType="phone-pad"
            maxLength={15}
            placeholder="Teléfono"
            ref="phone"
            returnKeyType="next"
          />
          <PickerField
            ref="gender"
            containerStyle={[{ flexDirection: 'row', flex: 0.4 }]}
            label="Sexo"
            pickerWrapper={<CustomModal />}
            placeholder="Sexo"
            options={{ default: '', male: 'Masculino', female: 'Femenino' }}
            labelStyle={[styles.pickerFieldLabel, { fontSize: 17, flex: 0.7 }]} />
          <DatePickerField
            ref="birthday"
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date('12/31/1999')}
            mode="date"
            pickerWrapper={<CustomModal />}
            placeholder="F. Nacimiento"
            placeholderStyle={styles.datePickerFieldPlaceholder}
          />
          <Button type="2" onPress={() => this.handleSubmit()}>Siguiente</Button>
        </Form>
        <Header
          containerStyle={{ borderColor: 'transparent' }}
          showNavBar={false} />
      </KeyboardAwareScrollView>
    );
  }
}

const CustomModal = ({ children, onHidePicker }) =>
  <Modal transparent={true}>
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(43, 48, 62, 0.57)' }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 8
        }}>
        {children}
        <TouchableOpacity style={{ alignItems: 'center' }}
          onPress={() => onHidePicker()}>
          <Text style={{ fontSize: 19, paddingBottom: 15 }}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
