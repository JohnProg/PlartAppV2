import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import Button from '../../components/Button';
import H1 from '../../components/H1';

import styles from '../../styles/basic.form.style';

const translucent = true;
const IntroScreen = ({ navigator }) => {
  const goTo = (screen, title) => {
    navigator.push({
      screen,
      title,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#673AB7' }}>
      <StatusBar
        translucent={translucent}
        backgroundColor={'#rgba(0, 0, 0, 0.2)'}
        barStyle="default"
        showHideTransition="slide"
        hidden={false}
      />
      <ScrollView contentContainerStyle={[styles.container, { alignItems: 'center' }]}>
        <H1>PUN</H1>
        <Icon name="group" size={100} color="#fff" style={{ margin: 20 }} />
        <Button onPress={() => goTo('plartApp.RegisterScreen', 'Crear cuenta')}>Registrarse</Button>
        <Button onPress={() => goTo('plartApp.LoginScreen', 'Iniciar Sesión')}>Iniciar sesión</Button>
      </ScrollView>
    </View>
  );
};

IntroScreen.navigatorStyle = { navBarHidden: true };
export default IntroScreen;
