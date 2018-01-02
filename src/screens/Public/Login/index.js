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
    const { navigator } = this.props;
    try {
      await this.props.dispatch(actions.login({
        username, password, device_key,
      }));
      navigator.resetTo({ screen: '' });
    } catch (error) {
      setTimeout(() => {
        Alert.alert('Error', Helpers.formatError(error));
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

export default connect(({ auth }) => ({
  isFetching: auth.isFetching,
}))(LoginScreen);
