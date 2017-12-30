import React from 'react';
import { StatusBar, View } from 'react-native';

// 3rd Party Libraries
import AppIntro from 'react-native-app-intro';
import Step from './../../components/Step';
import slide10 from './../../img/slide10.jpeg';
import slide4 from './../../img/slide4.jpeg';
import slide14 from './../../img/slide14.jpeg';

const translucent = true;
const TutorialScreen = ({ navigator }) => (
  <View>
    <StatusBar
      translucent={translucent}
      backgroundColor={'#rgba(0, 0, 0, 0.2)'}
      barStyle="default"
      showHideTransition="slide"
      hidden={false}
    />
    <AppIntro
      doneBtnLabel="Listo"
      skipBtnLabel="Saltar"
      onDoneBtnClick={() => navigator.resetTo({ screen: 'plartApp.IntroScreen', title: 'Inicio' })}
      onSkipBtnClick={() => navigator.resetTo({ screen: 'plartApp.IntroScreen', title: 'Inicio' })}
    >
      <Step
        image={slide10}
        text="Demuestra el talento que tienes dando a conocer tu trabajo"
      />
      <Step
        image={slide4}
        text="Entérate de de todos los eventos y novedades de tu localidad según tu preferencia"
      />
      <Step
        image={slide14}
        text="Consigue la oportunidad que tanto estabas esperando"
      />
    </AppIntro>
  </View>
);

export default TutorialScreen;
