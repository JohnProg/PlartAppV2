import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Image, Picker, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Moment from 'moment';
import showImagePicker from './../../../components/ImagePicker';
import * as actions from './../../../actions/meActions';
import rootNavigator from './../../../app';
import Button from './../../../components/Button';
import PickerModal from './../../../components/PickerModal';
import DatePickerDialog from './../../../components/DatePickerDialog';
import { OverlayLoader } from './../../../components/Loader';
import defaultImage from './../../../img/background.jpg';

// Utils
import Helpers from './../../../utils/Helpers';
import styles from './styles';

const genderOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
];
class PersonalInfoScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      avatar: undefined,
      gender: genderOptions[0],
      birthday: new Date('12/31/1999'),
    };
    this.inputs = {};
    this.enablesReturnKeyAutomatically = true;
  }

  onChange = (text, key) => (this.setState({ [key]: text }));

  onFocusNextField(key) {
    this.inputs[key].focus();
  }

  onShowImagePicker = () => {
    const options = Helpers.getDefaultImagePicker;
    options.title = 'Seleccionar foto';

    showImagePicker(options, async (response) => {
      if (!response.didCancel && !response.error) {
        if (!this.props.hasInternet) {
          Alert.alert('Necesitas internet subir esta imágen.');
          return;
        }
        const avatar = { uri: `data:${response.type};base64,${response.data}` };
        this.setState({ avatar });
      }
    });
  }

  handleSubmit = async () => {
    const { dispatch, hasInternet } = this.props;
    const {
      first_name, last_name, document, phone, gender, birthday, avatar,
    } = this.state;
    const data = {
      first_name,
      last_name,
      document,
      phone,
      gender,
      birthday,
    };

    if (!hasInternet) {
      Alert.alert('Aviso', 'Necesitas internet para ir al siguiente paso.');
      return;
    }

    if (data.gender) {
      data.gender = data.gender.value === 'male' ? 1 : 2;
    }
    if (data.birthday) {
      data.birthday = Moment(data.birthday).format(Helpers.getFormats.date);
    }
    if (avatar && avatar.uri) {
      data.profile_picture = avatar.uri;
    }

    try {
      await dispatch(actions.savePersonalInfo(data));
      await dispatch(actions.fetchCurrentUser());
      setTimeout(() => {
        rootNavigator.startPrivateApp();
      }, 100);
    } catch (_) {
      const { errors } = this.props;
      setTimeout(() => {
        Alert.alert('Error', Helpers.formatError(errors));
      }, 100);
    }
  }

  openDatePicker = () => {
    this.inputs.birthday.open({
      date: this.state.birthday,
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
    const { isFetching } = this.props;
    const { birthday, gender } = this.state;
    const birthdayText = Moment(birthday).format(Helpers.getFormats.dateHuman);
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <OverlayLoader visible={isFetching} />
        <View style={styles.avatarContainer}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.avatarButton}
            onPress={() => this.onShowImagePicker()}
          >
            <View style={styles.center}>
              <Image
                source={this.state.avatar || defaultImage}
                style={styles.avatarImage}
              />
              <Text style={styles.textEditAvatar}>Editar</Text>
            </View>
          </TouchableHighlight>
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
              onSubmitEditing={() => this.onFocusNextField('document')}
              ref={input => this.inputs.last_name = input}
              returnKeyType="next"
            />
          </View>
          <View style={styles.containerTwoGrid}>
            <View style={styles.containerItemTwoGrid}>
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
                  returnKeyType="next"
                />
              </View>
            </View>
            <View style={styles.containerItemTwoGrid}>
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
                  placeholder="Teléfono"
                  ref={input => this.inputs.phone = input}
                  returnKeyType="next"
                />
              </View>
            </View>
          </View>
          <Text>Género*</Text>
          <TouchableHighlight
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openGenderPicker()}
          >
            <Text style={styles.textField}>{gender.label}</Text>
          </TouchableHighlight>
          <PickerModal
            ref={input => this.inputs.gender = input}
            onValuePicked={value => this.onChange(value, 'gender')}
          >
            <Picker.Item label="Masculino" value="male" />
            <Picker.Item label="Femenino" value="female" />
          </PickerModal>
          <Text>Fecha de Nacimiento*</Text>
          <TouchableHighlight
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openDatePicker()}
          >
            <Text style={styles.textField}>{birthdayText}</Text>
          </TouchableHighlight>
          <DatePickerDialog
            ref={input => this.inputs.birthday = input}
            onDatePicked={date => this.onChange(date, 'birthday')}
          />
          <Button type={2} onPress={() => this.handleSubmit()}>Siguiente</Button>
        </View>
      </ScrollView>
    );
  }
}

PersonalInfoScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasInternet: PropTypes.bool.isRequired,
};

export default connect(({ app, me }) => ({
  hasInternet: app.hasInternet,
  errors: me.errors,
  isFetching: me.isFetching,
}))(PersonalInfoScreen);
