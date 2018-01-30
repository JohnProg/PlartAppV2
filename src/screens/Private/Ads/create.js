import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Picker, Text, TextInput, ScrollView, View, TouchableOpacity } from 'react-native';
// 3rd Party Libraries
import Moment from 'moment';

// Components
import PickerModal from './../../../components/PickerModal';
import DatePickerDialog from './../../../components/DatePickerDialog';
import { OverlayLoader } from './../../../components/Loader/';
import Button from './../../../components/Button';
import { createAd } from './../../../actions/adActions';

// Utils
import Helpers from '../../../utils/Helpers';

import styles from './styles';

class CreateAdScreen extends Component {
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
    this.state = {
      profession: '',
      location: '',
      dateFinish: new Date(),
    };
    this.inputs = {};
    this.multiline = true;
    this.scrolled = true;
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

  openDatePicker = () => {
    this.inputs.dateFinish.open({
      date: this.state.dateFinish,
      minimumDate: new Date(),
      maximumDate: new Date('1/1/2030'),
    });
  }

  openLocationPicker = () => {
    this.inputs.location.open({
      value: this.state.location && this.state.location.id,
      items: this.props.locations,
    });
  };

  openProfessionPicker = () => {
    this.inputs.profession.open({
      value: this.state.profession && this.state.profession.id,
      items: this.props.professions,
    });
  };

  handleSubmit = async () => {
    const { dispatch, hasInternet } = this.props;
    const {
      name, description, budget, location, profession, dateFinish,
    } = this.state;

    if (!hasInternet) {
      Alert.alert('Aviso', 'Necesitas internet para ir al siguiente paso.');
      return;
    }
    const data = {
      location,
      name,
      date_finish: dateFinish,
      description,
      budget: parseFloat(budget),
      profiles: profession,
    };

    if (data.date_finish) {
      data.date_finish = Moment(dateFinish).format('YYYY-MM-DD');
    }

    if (data.location) {
      data.location = location.id || location.value;
    }

    if (data.profiles) {
      data.profiles = [profession.id || profession.value];
    }

    try {
      await dispatch(createAd(data));
      setTimeout(() => {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
        this.props.navigator.showInAppNotification({
          screen: 'plartApp.Notification',
          passProps: {
            body: 'Este anuncio pasará por un proceso de evaluación.',
          },
          autoDismissTimerSec: 5,
        });
      }, 100);
    } catch (_) {
      const { errors } = this.props;
      Alert.alert('Error', Helpers.formatError(errors));
    }
  }

  render() {
    const {
      isCreating, locations, professions,
    } = this.props;
    const { dateFinish, profession, location } = this.state;
    const dateFinishText = Moment(dateFinish).format(Helpers.getFormats.dateHuman);

    return (
      <ScrollView
        contentContainerStyle={styles.contentContainerScrollView}
        style={styles.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <OverlayLoader visible={isCreating} />
        <View>
          <Text style={styles.textWhite}>Título*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              maxLength={250}
              onChangeText={text => this.onChange(text, 'name')}
              onSubmitEditing={() => this.onFocusNextField('budget')}
              ref={input => this.inputs.name = input}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.textWhite}>Presupuesto*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={styles.textField}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              maxLength={250}
              onChangeText={text => this.onChange(text, 'budget')}
              onSubmitEditing={() => this.onFocusNextField('description')}
              ref={input => this.inputs.budget = input}
              returnKeyType="next"
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.textWhite}>Descripción*</Text>
          <View style={styles.textFieldBox}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="always"
              style={[styles.textField, styles.descriptionTextField]}
              enablesReturnKeyAutomatically={this.enablesReturnKeyAutomatically}
              maxLength={250}
              onChangeText={text => this.onChange(text, 'description')}
              onSubmitEditing={() => this.onFocusNextField('description')}
              ref={input => this.inputs.description = input}
              multiline={this.multiline}
            />
          </View>
          <Text style={styles.textWhite}>Fecha de término*</Text>
          <TouchableOpacity
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openDatePicker()}
          >
            <Text style={[styles.textField, styles.textButtonPickerStyle]}>{dateFinishText}</Text>
          </TouchableOpacity>
          <DatePickerDialog
            ref={input => this.inputs.dateFinish = input}
            onDatePicked={date => this.onChange(date, 'dateFinish')}
          />
          <Text style={styles.textWhite}>Ubicación*</Text>
          <TouchableOpacity
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openLocationPicker()}
          >
            <Text style={[styles.textField, styles.textButtonPickerStyle]}>{location.name || location.label}</Text>
          </TouchableOpacity>
          <PickerModal
            ref={input => this.inputs.location = input}
            title="Elige una ubicación"
            scrolled={this.scrolled}
            onValuePicked={value => this.onChange(value, 'location')}
          >
            {
              locations.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))
            }
          </PickerModal>

          <Text style={styles.textWhite}>Perfil*</Text>
          <TouchableOpacity
            underlayColor="transparent"
            style={[styles.textFieldBox, styles.buttonPickerStyle]}
            onPress={() => this.openProfessionPicker()}
          >
            <Text style={[styles.textField, styles.textButtonPickerStyle]}>{profession.name || profession.label}</Text>
          </TouchableOpacity>
          <PickerModal
            ref={input => this.inputs.profession = input}
            title="Elige una profesión"
            scrolled={this.scrolled}
            onValuePicked={value => this.onChange(value, 'profession')}
          >
            {
              professions.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))
            }
          </PickerModal>
          <Button onPress={this.handleSubmit}>Crear</Button>
        </View>
      </ScrollView>
    );
  }
}

CreateAdScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  professions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isCreating: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
    showInAppNotification: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(({
  app, ad, profession, location,
}) => ({
  hasInternet: app.hasInternet,
  errors: ad.errors,
  professions: profession.items,
  isCreating: ad.isCreating,
  locations: location.items,
}))(CreateAdScreen);
