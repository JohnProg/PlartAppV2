import React, { Component } from 'react';
import { Alert, AsyncStorage, BackAndroid, ScrollView, TextInput, View } from 'react-native';

// Components
import Button from '../../components/Button';
import H1 from '../../components/H1';
import { OverlayLoader } from '../../components/Loader';

// Pages
// import ProfilesScreen from './ProfilesScreen';

// Utils
// import api from '../../Utils/api';
// import helpers from './../../Utils/helpers';
import styles from '../../styles/basic.form.style';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  _navigator.pop();
  return true;
});

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: Math.random().toString(36).substr(2, 10),
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      password: Math.random().toString(36).substr(2, 10),
      token: '',
      device_key: ''
    };
    _navigator = this.props.navigator;
  }

  register = () => {
    // var user = this.state;

    // this.setState({ isLoading: true });
    // api.registerUser(user)
    //   .then((authData) => {
    //     this.setState({ isLoading: false, username: '', email: '', password: '', device_key: '' });
    //     AsyncStorage.setItem('user', JSON.stringify(authData));
    //     this.props.navigator.resetTo({
    //       component: ProfilesScreen,
    //       passProps: { token: authData.token },
    //     });
    //   })
    //   .catch((errorObj) => {
    //     this.setState({ isLoading: false });
    //     let errorMessage = helpers.formatError(errorObj);

    //     setTimeout(() => {
    //       Alert.alert('Error', errorMessage);
    //     }, 100);
    //   });
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {/*<PushConfig onChangeToken={deviceKey => this.setState({device_key: deviceKey || ""})}/>*/}
        <ScrollView contentContainerStyle={styles.container}>
          <OverlayLoader visible={this.state.isLoading} />
          <H1 color='#fff'>Paso 1</H1>
          <TextInput
            ref="1"
            style={styles.textField}
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
            placeholder={"Usuario"}
            clearButtonMode='always'
            autoCorrect={false}
            returnKeyType={'next'}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            onSubmitEditing={() => this.focusNextField('2')}
          />
          <TextInput
            ref="2"
            style={styles.textField}
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            keyboardType='email-address'
            placeholder={"Correo electrónico"}
            clearButtonMode='always'
            autoCorrect={false}
            returnKeyType={'next'}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            onSubmitEditing={() => this.focusNextField('3')}
          />
          <TextInput
            ref="3"
            style={styles.textField}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Contraseña"}
            clearButtonMode='always'
            autoCorrect={false}
            returnKeyType={'done'}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            onSubmitEditing={this.register}
          />
          <Button onPress={() => this.register()}>Registrarse</Button>
        </ScrollView>
      </View>
    );
  }
}
