import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ScrollView, TextInput, View } from 'react-native';
import * as actions from './../../../actions/authActions';
// Components
import Button from '../../../components/Button';
import H1 from '../../../components/H1';
import { OverlayLoader } from '../../../components/Loader';

// Utils
import Helpers from './../../../utils/Helpers';
import styles from './styles';

const secureTextEntry = true;
const enablesReturnKeyAutomatically = true;
class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      username: Math.random().toString(36).substr(2, 10),
      password: Math.random().toString(36).substr(2, 10),
      device_key: 123,
    };
    this.inputs = {};
  }

  register = async () => {
    const {
      email, username, password, device_key,
    } = this.state;

    const { errors, navigator } = this.props;
    try {
      await this.props.dispatch(actions.register({
        email, username, password, device_key,
      }));
      navigator.resetTo({ screen: 'plartApp.Professions' });
    } catch (error) {
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
            ref={input => this.inputs.username = input}
            style={styles.textField}
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            placeholder="Usuario"
            clearButtonMode="always"
            autoCorrect={false}
            returnKeyType="next"
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            autoCapitalize="none"
            onSubmitEditing={() => this.focusNextField('email')}
          />
          <TextInput
            ref={input => this.inputs.email = input}
            style={styles.textField}
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType="email-address"
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
            secureTextEntry={secureTextEntry}
            placeholder="Contraseña"
            clearButtonMode="always"
            autoCorrect={false}
            returnKeyType="done"
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            autoCapitalize="none"
            onSubmitEditing={this.register}
          />
          <Button onPress={() => this.register()}>Registrarse</Button>
        </View>
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(({ auth }) => ({
  token: auth.token,
  isFetching: auth.isFetching,
  errors: auth.errors,
}))(RegisterScreen);