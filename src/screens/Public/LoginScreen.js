import React, { Component } from 'react';
import { Alert, AsyncStorage, BackAndroid, ScrollView, TextInput, View } from 'react-native';

// import Dashboard from '../Dashboard';

// Components
import Button from '../../components/Button';
import H1 from '../../components/H1';
import { OverlayLoader } from '../../components/Loader';
// import PushConfig from './../../Config/PushConfig';

// Utils
// import api from './../../utils/api';
// import helpers from './../../utils/helpers';
import styles from '../../styles/basic.form.style';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  _navigator.pop();
  return true;
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
    };
    _navigator = this.props.navigator;
  }

  login = () => {
    // this.setState({ isLoading: true });
    // api.authWithPassword({
    //   username: this.state.email,
    //   password: this.state.password,
    //   device_key: this.state.device_key,
    // })
    //   .then(authData => {
    //     this.setState({ isLoading: false });
    //     AsyncStorage.setItem('user', JSON.stringify(authData));
    //     this.props.navigator.resetTo({ component: Dashboard });
    //   })
    //   .catch(errorObj => {
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
          <H1 color='#fff'>PUN</H1>
          <TextInput
            ref="1"
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
            onSubmitEditing={() => this.focusNextField('2')}
          />
          <TextInput
            ref="2"
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
            onSubmitEditing={this.login}
          />
          <Button onPress={() => this.login()}>Iniciar sesión</Button>
        </ScrollView>
      </View>
    );
  }
}
