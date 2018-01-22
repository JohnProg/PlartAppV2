import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
// 3rd Party Libraries
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from './../../../actions/appActions';

import H1 from './../../../components/H1';
import Colors from './../../../utils/Colors';
import styles from './styles';

const slides = [
  {
    key: 'slide-1',
    title: 'Demuestra',
    text: 'El talento que tienes dando \na conocer tu trabajo',
    icon: 'md-people',
    backgroundColor: Colors.purple,
  },
  {
    key: 'slide-2',
    title: 'Entérate',
    text: 'De de todos los eventos y \nnovedades de tu localidad \nsegún tu preferencia',
    icon: 'md-globe',
    backgroundColor: Colors.red,
  },
  {
    key: 'slide-3',
    title: 'Consigue',
    text: 'La oportunidad que tanto \nestabas esperando',
    icon: 'ios-briefcase-outline',
    backgroundColor: Colors.blue,
  },
];

const Tutorial = ({ navigator, dispatch }) => {
  const goToHome = () => {
    dispatch(actions.updateTutorialStatus());
    navigator.resetTo({ screen: 'plartApp.Intro', title: 'Inicio' });
  };
  const renderItem = ({ backgroundColor, icon, title, text }) => (
    <View
      style={[styles.mainContainer, {
        backgroundColor,
      }]}
    >
      <H1>Achambear</H1>
      <Icon name={icon} size={200} color={Colors.white} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{text}</Text>
      </View>
    </View>
  );

  return (
    <AppIntroSlider
      doneLabel="Listo"
      skipLabel="Saltar"
      nextLabel="Siguiente"
      slides={slides}
      renderItem={renderItem}
      showSkipButton
      onDone={goToHome}
      onSkip={goToHome}
    />
  );
};

Tutorial.propTypes = {
  navigator: PropTypes.shape({
    resetTo: PropTypes.func.isRequired,
  }).isRequired,
};

Tutorial.navigatorStyle = { navBarHidden: true };
export default connect()(Tutorial);

