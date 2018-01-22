import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as actions from './../../../actions/professionActions';
import { completeStep1 } from './../../../actions/authActions';

// Components
import Button from '../../../components/Button';
import { OverlayLoader } from '../../../components/Loader';
import defaultImage from './../../../img/job.png';

// Utils
import Helpers from '../../../utils/Helpers';

import styles from './styles';

class ProfessionsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  componentDidMount() {
    if (this.props.hasInternet) {
      this.props.dispatch(actions.getProfessions());
    }
  }

  updateChosenProfession = (id) => {
    this.props.dispatch(actions.updateChosenProfession(id));
  }

  handleSubmit = async () => {
    const {
      dispatch, items, navigator, hasInternet,
    } = this.props;
    let selectedProfessions = items.filter(profession => profession.is_selected);
    selectedProfessions = selectedProfessions.map(profession => profession.id);

    if (!hasInternet) {
      Alert.alert('Aviso', 'Necesitas internet para ir al siguiente paso.');
      return;
    }

    if (selectedProfessions.length === 0) {
      Alert.alert('Aviso', 'Seleccionar al menos un perfil');
      return;
    }

    if (selectedProfessions.length > 5) {
      Alert.alert('Aviso', 'Seleccionar un máximo de 5 perfiles');
      return;
    }
    try {
      await dispatch(actions.saveSelectedProfessions({ profiles: [...selectedProfessions] }));
      dispatch(completeStep1());
      navigator.resetTo({
        screen: 'plartApp.PersonalInfo',
      });
    } catch (_) {
      const { errors } = this.props;
      setTimeout(() => {
        Alert.alert('Aviso', Helpers.formatError(errors));
      }, 100);
    }
  }

  renderProfessions = () => {
    const { items, isFetching } = this.props;
    if (isFetching) {
      return null;
    }
    return items.map(profession => (
      <TouchableOpacity
        onPress={() => this.updateChosenProfession(profession.id)}
        key={profession.id}
        style={styles.profession}
      >
        <ImageBackground
          style={styles.professionImage}
          resizeMode="contain"
          source={profession.photo ? { uri: profession.photo } : defaultImage}
        >
          <View style={[
            styles.professionOverlay, profession.is_selected ? styles.professionSelected : {},
          ]}
          >
            <Text style={styles.professionText}>{profession.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    ));
  }

  render() {
    const { isFetching, isUpdating } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <OverlayLoader visible={isFetching || isUpdating} />
          <Text style={styles.title}>Ayúdanos a definir a que tipo de perfil perteneces.</Text>
          <View style={styles.professionContainer}>
            {this.renderProfessions()}
          </View>
          {!isFetching ? <Button type={2} onPress={this.handleSubmit}>Siguiente</Button> : null}
        </ScrollView>
      </View>
    );
  }
}
ProfessionsScreen.propTypes = {
  hasInternet: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

export default connect(({ app, profession }) => ({
  hasInternet: app.hasInternet,
  items: profession.items,
  isFetching: profession.isFetching,
  isUpdating: profession.isUpdating,
  errors: profession.errors,
}))(ProfessionsScreen);
