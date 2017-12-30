import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Components
import Button from '../../Components/Button';
import { SimpleLoader, OverlayLoader } from '../../Components/Loader';

// Pages
import PersonalInfoPage from './PersonalInfoPage';

// Utils
import api from '../../Utils/api';
import helpers from '../../Utils/helpers';

import styles from '../../Styles/features.style.js';

export default class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      isLoading: false,
      areProfessionsLoading: true,
      token: props.token,
    }
  }

  componentWillMount() {
    if (!this.state.token) {
      AsyncStorage.getItem('user')
        .then(userDataStorage => this.setState({ token: JSON.parse(userDataStorage)['token'] }));
    }

    AsyncStorage.getItem('profiles')
      .then(professionsDataStorage => {
        if (!professionsDataStorage) this.getProfessions();
        else this.setState({ features: JSON.parse(professionsDataStorage), areProfessionsLoading: false });
      });
  }

  getProfessions() {
    api.getProfessions()
      .then((responseData) => {
        AsyncStorage.setItem('professions', JSON.stringify(responseData));
        this.setState({ features: responseData, areProfessionsLoading: false });
      });
  }

  updateChoice = (id) => {
    let features = this.state.features;

    let selectedFeature = features.find((feature) => id === feature.id);
    selectedFeature.isSelected = !selectedFeature.isSelected;

    this.setState(features);
  }

  handleSubmit = () => {
    const { token, features } = this.state;
    let profiles = [];

    this.setState({ isLoading: true });
    profiles = helpers.getListOfPropertyByProperty(features, 'id', 'isSelected');

    if (profiles.length > 5) {
      Alert.alert('Aviso', 'Seleccionar un máximo de 5 perfiles');
      return;
    }

    if (profiles.length === 0) {
      Alert.alert('Aviso', 'Seleccionar al menos un perfil');
      return;
    }

    api.postSaveFeatures({ token, profiles })
      .then((authData) => {
        this.setState({ isLoading: false });
        this.props.navigator.resetTo({
          component: PersonalInfoPage,
          passProps: {
            token
          }
        });
      })
      .catch((errorObj) => {
        console.warn(errorObj)
        this.setState({ isLoading: false });
        let errorMessage = helpers.formatError(errorObj);

        setTimeout(() => {
          Alert.alert('Aviso', errorMessage);
        }, 100);
      });
  }

  renderProfessions = (areProfessionsLoading) => {
    if (areProfessionsLoading) {
      return <SimpleLoader />;
    } else {
      return this.state.features.map((feature, i) =>
        <TouchableOpacity
          onPress={() => this.updateChoice(feature.id)}
          key={feature.id}
          style={styles.feature}>
          <Image
            style={styles.featureImage}
            resizeMode="contain"
            source={require('./../../Images/job.png')}>
            <View style={[styles.featureOverlay, feature.isSelected ? { backgroundColor: 'rgba(80,94,104,0)' } : {}]}>
              <Text style={styles.featureText}>{feature.name}</Text>
            </View>
          </Image>
        </TouchableOpacity>);
    }
  }

  render() {
    let { areProfessionsLoading } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <OverlayLoader visible={this.state.isLoading} />
          <Text style={styles.title}>Ayúdanos a definir a que tipo de perfil perteneces.</Text>
          <View style={styles.featureContainer}>
            {this.renderProfessions(areProfessionsLoading)}
          </View>
          {!areProfessionsLoading ? <Button type="2" onPress={this.handleSubmit}>Siguiente</Button> : null}
        </ScrollView>
      </View>
    );
  }
}
