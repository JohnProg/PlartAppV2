import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/Ionicons';

import Button from './../../../components/Button';
import H1 from './../../../components/H1';
import Colors from './../../../utils/Colors';

import styles from './styles';

const IntroScreen = ({ navigator }) => {
  const goTo = (screen, title) => {
    navigator.push({
      screen,
      title,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.introScreenScroll}>
        <H1>Achambear</H1>
        <Icon name="md-people" size={200} color={Colors.white} />
        <Button onPress={() => goTo('plartApp.Register', 'Crear cuenta')}>Registrarse</Button>
        <Button onPress={() => goTo('plartApp.Login', 'Iniciar Sesión')}>Iniciar sesión</Button>
      </ScrollView>
    </View>
  );
};

IntroScreen.propTypes = {
  navigator: PropTypes.shape({
    resetTo: PropTypes.func.isRequired,
  }).isRequired,
};

IntroScreen.navigatorStyle = { navBarHidden: true };
export default IntroScreen;
