'use strict';

import React, { Component } from 'react';

import { Alert, Dimensions, Image, Modal, Platform, Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DatePickerField, Form, InputField, PickerField } from 'react-native-form-generator';

// Components
import Header from './../../Components/Header';
import { KeyboardAwareScrollView } from './../../Components/KeyboardAwareScrollView';
import { SimpleLoader, OverlayLoader } from '../../Components/Loader';

// Utils
import api from './../../Utils/api';
import helpers from '../../Utils/helpers';

import styles2 from '../../Styles/features.style.js';

const { width } = Dimensions.get('window');

export default class CreateAnnouncementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      isLoading: false,
      formData: {},
      profession: '',
      location: '',
      locations: this.props.locations,
      professions: this.props.professions,
      formWasModified: false,
    }
  }

  focusNextField(nextField) {
    this.refs.registrationForm.refs[nextField].focus();
  }

  handleFormChange(formData) {
    this.setState({ formData: formData })
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  createAd = () => {
    let { professions, locations, dateFinish, location, profession, name, description, budget, token } = this.state;
    this.setState({ isLoading: true });
    let date_finish;

    if (dateFinish) date_finish = Moment(dateFinish).format('YYYY-MM-DD');

    location = locations.find(element => element.name === location);
    if (location) location = location.id;

    profession = professions.find(element => element.name === profession);
    if (profession) profession = profession.id;

    budget = parseFloat(budget);

    const data = {
      token,
      location,
      name,
      date_finish,
      description,
      budget,
      profiles: [profession],
    }

    api.postCreateAd(data)
      .then((newAd) => {
        this.setState({ isLoading: false });
        this.props.onPress(true);
      })
      .catch((errorObj) => {
        this.setState({ isLoading: false });
        let errorMessage = helpers.formatError(errorObj);

        setTimeout(() => {
          Alert.alert('Error', errorMessage);
        }, 100);
      });
  }

  render() {
    let { locations, professions, location, profession, name, description, budget } = this.state;
    const gray = "#9E9E9E";
    let options = { '': 'Elige tu ubicación' };
    let profileOptions = { '': 'Elige tu perfil' };

    locations.forEach((location) => {
      options[location.name] = location.name;
    });

    professions.forEach((profession) => {
      profileOptions[profession.name] = profession.name;
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <OverlayLoader visible={this.state.isLoading} />
        <Header
          title="Crear Anuncio"
          leftText="Cancelar"
          showStatusBar={Platform.OS === 'ios'}
          onLeftPress={() => {
            if (name || description || budget || location || profession) {
              Alert.alert(
                'Cambios sin guardar',
                'No guardaste los cambios. ¿Estás seguro de que deseas cancelar?',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => {
                      professions.forEach((profession) => profession.isSelected = false);
                    }
                  },
                  {
                    text: 'Si',
                    onPress: () => {
                      professions.forEach((profession) => profession.isSelected = false);
                      this.props.onPress()
                    }
                  },
                ]
              );
            } else {
              professions.forEach((profession) => profession.isSelected = false);
              this.props.onPress();
            }
          }}
          rightText="Listo"
          onRightPress={this.createAd}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always" >
          <Form ref="registrationForm"
            onChange={this.handleFormChange.bind(this)}>
            <InputField
              ref="1"
              style={styles.default}
              onChangeText={value => this.setState({ name: value })}
              value={this.state.name}
              placeholder="Título"
              clearButtonMode="always"
              autoCorrect={false}
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              autoCapitalize="words"
              placeholderTextColor={gray}
              onSubmitEditing={() => this.focusNextField('2')}
            />
            <InputField
              ref="2"
              style={styles.default}
              onChangeText={value => this.setState({ budget: value })}
              value={this.state.budget}
              placeholder="Presupuesto"
              clearButtonMode="always"
              autoCorrect={false}
              returnKeyType="next"
              keyboardType="numeric"
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={gray}
            />
            <InputField
              ref="3"
              style={styles.default}
              onChangeText={value => this.setState({ description: value })}
              value={this.state.description}
              placeholder="Descripción"
              clearButtonMode="always"
              autoCorrect={false}
              returnKeyType="next"
              multiline={true}
              enablesReturnKeyAutomatically={true}
              autoCapitalize="none"
              placeholderTextColor={gray}
            />
            <DatePickerField
              ref="4"
              minimumDate={new Date()}
              mode='date'
              pickerWrapper={<CustomModal />}
              placeholder='Fecha de término'
              onValueChange={value => this.setState({ dateFinish: value })}
              placeholderStyle={styles.datePickerFieldPlaceholder}
            />
            <PickerField
              ref="5"
              label="Ubicación"
              labelStyle={styles.pickerFieldLabel}
              containerStyle={styles.pickerFieldContainer}
              pickerStyle={styles.pickerField}
              placeholder="Ubicación"
              onValueChange={value => this.setState({ location: value })}
              pickerWrapper={<CustomModal />}
              prettyPrint={true}
              options={options}
            />
            <PickerField
              ref="6"
              label="Perfil"
              labelStyle={styles.pickerFieldLabel}
              containerStyle={styles.pickerFieldContainer}
              pickerStyle={styles.pickerField}
              placeholder="Perfil"
              onValueChange={value => this.setState({ profession: value })}
              pickerWrapper={<CustomModal />}
              prettyPrint={true}
              options={profileOptions}
            />
          </Form>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  default: {
    flex: 1,
    fontSize: 14,
    padding: 4,
    fontWeight: '400',
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
  },
  pickerField: {
    flex: 0.4,
  },
  label: {
    paddingLeft: 10,
    fontSize: 14,
  },
  pickerFieldContainer: {
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
  },
  pickerFieldLabel: {
    paddingLeft: Platform.OS === 'android' ? 5 : 10,
    fontSize: 14,
    color: '#9E9E9E',
    flex: 0.7,
    paddingTop: Platform.OS === 'android' ? 15 : 5,
  },
  datePickerFieldPlaceholder: {
    marginTop: (Platform.OS === 'ios') ? 6 : 0,
    marginLeft: (Platform.OS === 'ios') ? 0 : -5,
    color: '#9E9E9E',
    fontSize: 14,
  },
});

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
