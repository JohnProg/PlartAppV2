import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import imageDefault from './../../../img/job.png';
import styles from './styles';
import rootNavigator from './../../../app';
import { ImageLoader } from './../../../components/Loader/';
import * as actions from './../../../actions/authActions';

const AVATAR_SIZE = 80;

class Drawer extends Component {
  goToProfile = () => {
    this.props.navigator.push({
      screen: 'plartApp.Profile',
    });
  }

  logout = () => {
    Alert.alert(
      'Alert Title',
      'Estas seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Si',
          onPress: () => {
            this.props.navigator.toggleDrawer({
              side: 'left',
              animated: 'true',
              to: 'closed',
            });
            this.props.dispatch(actions.logOut());
            rootNavigator.startAppWithScreen({ screen: 'plartApp.Intro' });
          },
        },
      ],
    );
  }

  render() {
    const { currentUser } = this.props;
    const fullName = `${currentUser.first_name} ${currentUser.last_name}`;

    return (
      <ScrollView
        scrollsToTop={false}
        contentContainerStyle={styles.containerMenu}
      >
        <View style={{ alignItems: 'center' }}>
          <ImageLoader
            source={currentUser.photo ? { uri: currentUser.photo.replace('http', 'https') } : imageDefault}
            style={[styles.avatar, { width: AVATAR_SIZE, height: AVATAR_SIZE }]}
            indicatorStyle={{ flex: 1, backgroundColor: 'rgba(220, 213, 228, 0.54)' }} />
          <Text style={styles.sectionSpeakerText}>
            {fullName.length > 13 ? `${fullName.slice(0, 13)}...` : fullName}
          </Text>
          <Text style={styles.sectionTitleText}>
            {currentUser.username && currentUser.username.length > 13 ? `${currentUser.username.slice(0, 13)}...` : currentUser.username}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.logout()}
        >
          <Text style={styles.item}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.goToProfile()}
        >
          <Text style={styles.item}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.logout()}
        >
          <Text style={styles.item}>Salir</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


Drawer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
};


function mapStateToProps({ me }) {
  return {
    currentUser: me.currentUser,
  };
}

export default connect(mapStateToProps)(Drawer);
