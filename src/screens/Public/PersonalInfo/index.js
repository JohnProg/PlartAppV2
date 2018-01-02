import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, Modal, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Form, InputField, PickerField, DatePickerField } from 'react-native-form-generator';
import ImagePicker from 'react-native-image-picker';
import * as actions from './../../../actions/meActions';
import Button from './../../../components/Button';
import { OverlayLoader } from './../../../components/Loader';
import defaultImage from './../../../img/background.jpg';

// Utils
import Helpers from './../../../utils/Helpers';
import styles from './styles';


class PersonalInfoScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
    };
    this.inputs = {};
    this.enablesReturnKeyAutomatically = true;
  }

  onChange = (text, key) => {
    this.setState({ [key]: text });
  }

  handleSubmit = async () => {
    const { dispatch, errors, navigator } = this.props;
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

    if (data.gender) {
      data.gender = data.gender === 'male' ? 1 : 2;
    }
    if (data.birthday) {
      data.birthday = Moment(data.birthday).format(Helpers.getFormats.date);
    }
    if (avatar.uri) {
      // data.profile_picture = avatar.uri;
    }

    try {
      await dispatch(actions.savePersonalInfo(data));
      navigator.resetTo({ screen: 'plartApp.Home' });
    } catch (error) {
      setTimeout(() => {
        Alert.alert('Error', Helpers.formatError(errors));
      }, 100);
    }
  }

  focusNextField(key) {
    this.inputs[key].focus();
  }

  capturePhoto = () => {
    const options = Helpers.getDefaultImagePicker;
    options.title = 'Seleccionar foto';

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        const avatar = { uri: `data:${response.type};base64,${response.data}` };
        this.setState({ avatar });
      }
    });
  }

  render() {
    const { isFetching } = this.props;
    return (
      <View
        style={styles.container}
      >
        <OverlayLoader visible={isFetching} />
        <View style={{ alignItems: 'center', marginBottom: 20, paddingTop: 60 }}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.avatarButton}
            onPress={() => this.capturePhoto()}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={this.state.avatar || defaultImage}
                style={styles.avatar}
              />
              <Text style={styles.textEditAvatar}>Editar</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Form>
          <InputField
            autoCapitalize="words"
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
            maxLength={250}
            onValueChange={text => this.onChange(text, 'first_name')}
            onSubmitEditing={() => this.focusNextField('last_name')}
            placeholder="Nombres"
            ref={input => this.inputs.first_name = input}
            returnKeyType="next"
          />
          <InputField
            autoCapitalize="words"
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
            onValueChange={text => this.onChange(text, 'last_name')}
            onSubmitEditing={() => this.focusNextField('document')}
            placeholder="Apellidos"
            ref={input => this.inputs.last_name = input}
            returnKeyType="next"
          />
          <InputField
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
            keyboardType="numeric"
            maxLength={8}
            onValueChange={text => this.onChange(text, 'document')}
            onSubmitEditing={() => this.focusNextField('phone')}
            placeholder="DNI"
            ref={input => this.inputs.document = input}
            returnKeyType="next"
          />
          <InputField
            autoCorrect={false}
            clearButtonMode="always"
            containerStyle={styles.textField}
            enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
            keyboardType="phone-pad"
            maxLength={15}
            onValueChange={text => this.onChange(text, 'phone')}
            placeholder="Teléfono"
            ref={input => this.inputs.phone = input}
            returnKeyType="next"
          />
          <PickerField
            ref={input => this.inputs.gender = input}
            containerStyle={styles.pickerFieldContainer}
            label="Sexo"
            pickerWrapper={<CustomModal />}
            placeholder="Sexo"
            onValueChange={text => this.onChange(text, 'gender')}
            options={{ default: 'Seleccione un género', male: 'Masculino', female: 'Femenino' }}
            labelStyle={[styles.pickerFieldLabel]}
          />
          <DatePickerField
            ref={input => this.inputs.birthday = input}
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date('12/31/1999')}
            mode="date"
            pickerWrapper={<CustomModal />}
            placeholder="F. Nacimiento"
            onValueChange={text => this.onChange(text, 'birthday')}
            placeholderStyle={styles.datePickerFieldPlaceholder}
          />
          <Button type="2" onPress={() => this.handleSubmit()}>Siguiente</Button>
        </Form>
      </View>
    );
  }
}

const CustomModal = ({ children, onHidePicker }) => (
  <Modal transparent={true}>
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', backgroundColor: 'rgba(43, 48, 62, 0.57)' }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 8
        }}>
        {children}
        <TouchableOpacity style={{ alignItems: 'center' }}
          onPress={() => onHidePicker()}
        >
          <Text style={{ fontSize: 19, paddingBottom: 15 }}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

PersonalInfoScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(({ me }) => ({
  errors: me.errors,
  isFetching: me.isFetching,
}))(PersonalInfoScreen);
