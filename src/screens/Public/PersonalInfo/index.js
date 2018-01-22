import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Image, PermissionsAndroid, Platform, Picker, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
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
      // data.profile_picture = avatar.uri;
    }

    try {
      rootNavigator.startPrivateApp();
      await dispatch(actions.savePersonalInfo(data));
      // rootNavigator.startPrivateApp();
      // navigator.resetTo({
      //   screen: 'plartApp.Intro',
      //   title: 'Schedule',
      //   label: 'Schedule',
      //   animated: true,
      //   animationType: 'fade',
      //   navigatorStyle: {
      //     navBarTextColor: '#fff800',
      //     navBarTextFontSize: 18,
      //     navBarBackgroundColor: '#3843e9',
      //     navBarButtonColor: '#ffffff',
      //     navBarNoBorder: true,
      //   },
      // });
      // navigator.resetTo({ screen: 'plartApp.Home' });
    } catch (_) {
      const { errors } = this.props;
      setTimeout(() => {
        Alert.alert('Error', Helpers.formatError(errors));
      }, 100);
    }
  }

  focusNextField(key) {
    this.inputs[key].focus();
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

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        const avatar = { uri: `data:${response.type};base64,${response.data}` };
        this.setState({ avatar });
        // import ImageResizer from 'react-native-image-resizer';
        // var source_upload;
        // if (Platform.OS === 'android') {
        //     source_upload = {uri: response.uri, isStatic: true};
        // } else {
        //     source_upload = {uri: response.uri.replace('file://', ''), isStatic: true};
        // }
        // ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath).then((resizedImageUri) => {
        // ImageResizer.createResizedImage(response.uri, 200, 200, 'JPEG', 50).then((resizedImageUri) => {
        //     compressedImageUri = resizedImageUri;
        // }).catch((err) => {
        //     return;
        // });
        // this.setState({ avatar: source_upload });
      }
    });
  }

  openDateDialog = () => {
    this.inputs.birthday.open({
      date: this.state.birthday,
      minimumDate: new Date('1/1/1900'),
      maximumDate: new Date('12/31/1999'),
    });
  }

  openGenderPicker = () => {
    this.inputs.gender.open({
      value: this.state.gender,
      items: genderOptions,
    });
  };

  openPickerDialog = () => {
    this.inputs.gender.open(this.state.gender);
  }

  render() {
    const { isFetching } = this.props;
    const { birthday, gender } = this.state;
    const birthdayText = Moment(birthday).format(Helpers.getFormats.dateHuman);
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <OverlayLoader visible={isFetching} />
        <View style={styles.avatarContainer}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.avatarButton}
            onPress={() => this.showImagePicker()}
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
              onSubmitEditing={() => this.focusNextField('last_name')}
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
              onSubmitEditing={() => this.focusNextField('document')}
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
                  onSubmitEditing={() => this.focusNextField('phone')}
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
            style={styles.textFieldBox}
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
            style={styles.textFieldBox}
            onPress={() => this.openDateDialog()}
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
};

export default connect(({ app, me }) => ({
  hasInternet: app.hasInternet,
  errors: me.errors,
  isFetching: me.isFetching,
}))(PersonalInfoScreen);
