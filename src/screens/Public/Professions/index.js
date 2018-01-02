import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as actions from './../../../actions/professionActions';

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

  async componentDidMount() {
    if (this.props.items.length === 0) {
      this.getProfessions();
    }
  }

  async getProfessions() {
    await this.props.dispatch(actions.getProfessions());
  }

  updateChosenProfession = (id) => {
    this.props.dispatch(actions.updateChosenProfession(id));
  }

  handleSubmit = async () => {
    const { dispatch, items, navigator } = this.props;
    let selectedProfessions = items.filter(profession => profession.is_selected);
    selectedProfessions = selectedProfessions.map(profession => profession.id);

    if (selectedProfessions.length === 0) {
      Alert.alert('Aviso', 'Seleccionar al menos un perfil');
      return;
    }

    if (selectedProfessions.length > 5) {
      Alert.alert('Aviso', 'Seleccionar un máximo de 5 perfiles');
      return;
    }
    try {
      await dispatch(actions.saveSelectedProfessions([...selectedProfessions]));
      navigator.resetTo({
        screen: 'plartApp.PersonalInfo',
      });
    } catch (error) {
      setTimeout(() => {
        Alert.alert('Aviso', Helpers.formatError(error));
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
        style={styles.feature}
      >
        <ImageBackground
          style={styles.featureImage}
          resizeMode="contain"
          source={profession.photo ? { uri: profession.photo } : defaultImage}
        >
          <View style={[
            styles.featureOverlay, profession.is_selected ? styles.professionSelected : {},
          ]}
          >
            <Text style={styles.featureText}>{profession.name}</Text>
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
          <View style={styles.featureContainer}>
            {this.renderProfessions()}
          </View>
          {!isFetching ? <Button type="2" onPress={this.handleSubmit}>Siguiente</Button> : null}
        </ScrollView>
      </View>
    );
  }
}
ProfessionsScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

export default connect(({ profession }) => ({
  items: profession.items,
  isFetching: profession.isFetching,
  isUpdating: profession.isUpdating,
  errors: profession.errors,
}))(ProfessionsScreen);
