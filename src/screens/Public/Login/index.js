import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, TextInput, View } from 'react-native';
import * as actions from './../../../actions/authActions';
import rootNavigator from './../../../app';
// Components
import Button from '../../../components/Button';
import H1 from '../../../components/H1';
import { OverlayLoader } from '../../../components/Loader';

// Utils
import Helpers from './../../../utils/Helpers';
import styles from './styles';

// let _navigator;
// BackHandler.addEventListener('hardwareBackPress', () => {
//   _navigator.pop();
//   return true;
// });
const secureTextEntry = true;
const enablesReturnKeyAutomatically = true;
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    // _navigator = this.props.navigator;
    this.inputs = {};
  }

  login = async () => {
    const { email: username, password, device_key } = this.state;
    const { dispatch, hasInternet } = this.props;

    if (!hasInternet) {
      Alert.alert('Aviso', 'Necesitas internet para ir al siguiente paso.');
      return;
    }
    try {
      await dispatch(actions.logIn({
        username, password, device_key,
      }));
      rootNavigator.startPrivateApp();
    } catch (_) {
      const { errors } = this.props;
      setTimeout(() => {
        Alert.alert('Error', Helpers.formatError(errors));
      }, 100);
    }
  }

  focusNextField(key) {
    this.inputs[key].focus();
  }

  render() {
    const { isFetching } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <OverlayLoader visible={isFetching} />
          <H1>Achambear</H1>
          <TextInput
            style={styles.textField}
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            placeholder="Correo electrónico"
            clearButtonMode="always"
            autoCorrect={false}
            returnKeyType="next"
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            autoCapitalize="none"
            onSubmitEditing={() => this.focusNextField('password')}
          />
          <TextInput
            ref={input => this.inputs.password = input}
            style={styles.textField}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            underlineColorAndroid="transparent"
            secureTextEntry={secureTextEntry}
            placeholder="Contraseña"
            clearButtonMode="always"
            autoCorrect={false}
            returnKeyType="done"
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            autoCapitalize="none"
            onSubmitEditing={this.login}
          />
          <Button onPress={() => this.login()}>Iniciar sesión</Button>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(({ app, auth }) => ({
  hasInternet: app.hasInternet,
  isFetching: auth.isFetching,
}))(LoginScreen);
